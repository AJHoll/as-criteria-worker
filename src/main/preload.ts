import Electron, { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Channels } from './interfaces/Channels';
import { promises as fs } from 'fs';

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
