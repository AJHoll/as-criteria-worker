import { AppWindow } from '../../interfaces/AppWindow';

export class ControlsUtil {
  window: AppWindow;

  constructor() {
    this.window = (window as unknown as AppWindow);
  }

  minimize() {
    this.window.api.controls.minimize();
  }

  toggleMaximize() {
    this.window.api.controls.toggleMaximize();
  }

  close() {
    this.window.api.controls.close();
  }

  isMaximized(): boolean {
    return this.window.api.controls.isMaximized();
  }

  saveToJSON(content: string, fileName: string): Promise<void> {
    return this.window.api.controls.saveToJSON(content, fileName);
  }

  loadFromJSON(): Promise<string> {
    return this.window.api.controls.loadFromJSON();
  }
}

const controlsUtil = new ControlsUtil();
export default controlsUtil;
