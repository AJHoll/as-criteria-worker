import { AppWindow } from '../../interfaces/AppWindow';
import { Channels } from '../../main/preload';

export class IpcUtil {
  window: AppWindow;

  constructor() {
    this.window = (window as unknown as AppWindow);
  }

  send(channel: Channels, args: unknown[]) {
    this.window.api.ipcRenderer.send(channel, args);
  }

  on(channel: Channels, func: (...args: any[]) => void) {
    this.window.api.ipcRenderer.on(channel, func);
  }

  once(channel: Channels, func: (...args: any[]) => void) {
    this.window.api.ipcRenderer.once(channel, func);
  }
}

const ipcUtil = new IpcUtil();
export default ipcUtil;
