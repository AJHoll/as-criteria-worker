import { AppWindow } from '../../interfaces/AppWindow';
import { SkillItemData } from '../stores/ManageCriteriaStore';

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

  loadFromXLSX(): Promise<SkillItemData[]> {
    return this.window.api.controls.loadFromXLSX();
  }

  saveToXLSX(content: SkillItemData[], fileName: string): Promise<void> {
    return this.window.api.controls.saveToXLSX(content, fileName);
  }
}

const controlsUtil = new ControlsUtil();
export default controlsUtil;
