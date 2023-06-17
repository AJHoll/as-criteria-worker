import Electron, { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Channels } from './interfaces/Channels';

const { BrowserWindow } = require('@electron/remote');

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
    },
    isMaximized() {
      return !!BrowserWindow.getFocusedWindow()?.isMaximized();
    },
    onMaximizedHandler() {
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
