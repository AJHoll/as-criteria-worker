import { Store } from '../../interfaces/Store';
import { makeAutoObservable } from 'mobx';
import { WindowTabProps } from '../components/WindowTab/WindowTab';
import { v4 as uuid } from 'uuid';
// eslint-disable-next-line import/no-cycle
import RootStore from './RootStore';

export interface StoredWindowTabProps extends WindowTabProps {
  componentName: string;
}

export default class WindowTabBarStore implements Store {
  private readonly _id: string;

  get id(): string {
    return this._id;
  }

  private readonly _rootStore: RootStore;

  get rootStore(): RootStore {
    return this._rootStore;
  }

  private _tabs: StoredWindowTabProps[];

  get tabs(): StoredWindowTabProps[] {
    return this._tabs;
  }

  set tabs(value: StoredWindowTabProps[]) {
    this._tabs = value;
  }

  constructor(rootStore: RootStore) {
    this._id = 'windowTabBarStore';
    this._rootStore = rootStore;
    this._tabs = [
      { id: 'main-menu', componentName: 'mainPage', title: '', active: true },
    ];
    makeAutoObservable(this);
  }

  activeTab(id: string) {
    this.tabs = [...this.tabs.map((tab) => ({ ...tab, active: tab.id === id }))];
    const componentName = this.tabs.find((tab) => tab.id === id)?.componentName;
    if (componentName !== undefined) {
      this.rootStore.activeComponentName = componentName;
    }
  }

  closeTab(id: string) {
    this.tabs = this.tabs.filter((tab) => tab.id !== id);
    this.activeTab(this.tabs[this.tabs.length - 1].id);
  }

  addTab(componentName: string, title: string, icon?: string) {
    const intBarTab = this.tabs.find((tab) => tab.componentName === componentName);
    let id = '';
    if (!intBarTab) {
      id = uuid();
      this.tabs = [...this.tabs, {
        id,
        componentName,
        title,
        icon,
      }];
    } else {
      id = intBarTab.id;
    }
    this.activeTab(id);
  }
}
