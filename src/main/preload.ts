import Electron, { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Channels } from './interfaces/Channels';
import { promises as fs } from 'fs';
import ExcelJS from 'exceljs';
import { AspectItemData, SkillItemData, SubcriteriaItemData } from '../renderer/stores/ManageCriteriaStore';
import { v4 as uuid } from 'uuid';

const { BrowserWindow, dialog } = require('@electron/remote');

contextBridge.exposeInMainWorld('api', {
  controls: {
    minimize() {
      BrowserWindow.getFocusedWindow()?.minimize();
    },
    toggleMaximize() {
      const win: Electron.BrowserWindow = BrowserWindow.getFocusedWindow();
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
      return win.isMaximized();
    },
    close() {
      BrowserWindow.getFocusedWindow()?.close();
    },
    isMaximized() {
      return !!BrowserWindow.getFocusedWindow()?.isMaximized();
    },
    onMaximizedHandler() {
    },
    async saveToJSON(content: string, fileName: string): Promise<void> {
      const data = await dialog.showSaveDialog({ defaultPath: fileName });
      if (!data.canceled) {
        await fs.writeFile(data.filePath, content, { encoding: 'utf-8' });
      }
    },
    async loadFromJSON(): Promise<string> {
      const data = await dialog.showOpenDialog({ filters: [{ name: 'JSON', extensions: ['json'] }] });
      if (!data.canceled) {
        return fs.readFile(data.filePaths[0], { encoding: 'utf-8' });
      }
      return '';
    },

    async saveToXLSX(content: SkillItemData[], fileName: string): Promise<void> {
      const fileData = await dialog.showSaveDialog({ defaultPath: fileName });
      if (!fileData.canceled) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('CIS Marking Scheme Import', { state: 'visible' });
      }
    },

    async loadFromXLSX(): Promise<SkillItemData[]> {
      const data: SkillItemData[] = [];
      const fileData = await dialog.showOpenDialog({ filters: [{ name: 'JSON', extensions: ['xlsx'] }] });
      if (!fileData.canceled) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(fileData.filePaths[0]);
        const sheet = workbook.getWorksheet(1);
        sheet?.getRows(4, 8)?.forEach((row) => {
          if (row.hasValues) {
            data.push({
              id: uuid(),
              key: row.getCell('C').text,
              caption: row.getCell('E').text,
              mark: row.getCell('F').text,
              subcriterias: [],
            });
          }
        });
        data.forEach((skill) => {
          sheet.eachRow((row, rowNumber) => {
            if (row.hasValues) {
              if (row.getCell('A').text.indexOf(skill.key) === 0) {
                const newSubcriteria: SubcriteriaItemData = {
                  id: uuid(),
                  order: row.getCell('A').text.replaceAll(skill.key, ''),
                  caption: row.getCell('B').text,
                  aspects: [],
                };
                let aspectsMaxRowNum = rowNumber + 1;
                while (sheet.getRow(aspectsMaxRowNum).getCell('A').text.length === 0 && aspectsMaxRowNum < sheet.rowCount) {
                  aspectsMaxRowNum++;
                }
                sheet.getRows(rowNumber + 1, aspectsMaxRowNum - (rowNumber + 1))?.forEach((aspectRow) => {
                  if (aspectRow.hasValues) {
                    if (['B', 'D', 'J'].indexOf(aspectRow.getCell('C').text) !== -1) {
                      const newAspect: AspectItemData | any = {
                        id: uuid(),
                        type: aspectRow.getCell('C').text,
                        caption: aspectRow.getCell('E').text,
                        description: aspectRow.getCell('G').text,
                        maxMark: aspectRow.getCell('J').text,
                        extraAspect: [],
                        judgeScore: [],
                      };
                      let extraMaxRowNum = aspectRow.number + 1;
                      while (sheet.getRow(extraMaxRowNum).getCell('E').text.length === 0 && extraMaxRowNum < sheet.rowCount) {
                        extraMaxRowNum++;
                      }
                      if (extraMaxRowNum !== sheet.rowCount) {
                        extraMaxRowNum--;
                      }
                      sheet.getRows(aspectRow.number + 1, extraMaxRowNum - aspectRow.number)?.forEach((extraRow) => {
                        if (extraRow.hasValues) {
                          if (newAspect.type === 'D'
                            && extraRow.getCell('G').text.length > 0
                            && (extraRow.getCell('J').text.match('\\d+') ?? []).length > 0) {
                            newAspect.extraAspect.push({
                              id: uuid(),
                              description: extraRow.getCell('G').text,
                              mark: extraRow.getCell('J').text,
                              rate: '',
                            });
                          } else if (newAspect.type === 'J'
                            && extraRow.getCell('G').text.length > 0
                            && ['0', '1', '2', '3'].indexOf(extraRow.getCell('F').text) !== -1) {
                            newAspect.judgeScore.push({
                              id: uuid(),
                              description: extraRow.getCell('G').text,
                              score: extraRow.getCell('F').text,
                            });
                          }
                        }
                      });
                      newSubcriteria.aspects.push(newAspect);
                    }
                  }
                });
                skill.subcriterias.push(newSubcriteria);
              }
            }
          });
        });
      }
      return data;
    },
  },
  ipcRenderer: {
    send(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
