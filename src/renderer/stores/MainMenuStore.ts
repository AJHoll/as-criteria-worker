// eslint-disable-next-line import/no-cycle
import { Store } from '../../interfaces/Store';
import { makeAutoObservable } from 'mobx';
import RootStore from './RootStore';

export interface MenuItem {
  id: string;
  componentName: string;
  title: string;
  icon?: string;
  groupName?: string;
  groupIcon?: string;
}

export default class MainMenuStore implements Store {
  private readonly _id: string;

  get id(): string {
    return this._id;
  }

  private readonly _rootStore: RootStore;

  get rootStore(): RootStore {
    return this._rootStore;
  }

  private _menu: MenuItem[];

  get menu(): MenuItem[] {
    return this._menu;
  }

  set menu(value: MenuItem[]) {
    this._menu = value;
  }

  private _menuItemSearchValue: string;

  get menuItemSearchValue(): string {
    return this._menuItemSearchValue;
  }

  set menuItemSearchValue(value: string) {
    this._menuItemSearchValue = value;
  }

  constructor(rootStore: RootStore) {
    this._id = 'mainMenuStore';
    this._rootStore = rootStore;
    this._menu = [];
    this._menuItemSearchValue = '';
    makeAutoObservable(this);
  }

  selectMenuItem = (menuItemId: string) => {
    const menuItem = this.menu.find((item) => item.id === menuItemId);
    if (menuItem) {
      this.rootStore.windowTabBarStore.addTab(menuItem.componentName, menuItem.title, menuItem.icon);
    } else {
      const errorMessage = `Не удалось найти пункт меню ${menuItemId}!`;
      this.rootStore.toastRef?.current?.error(errorMessage);
    }
  };

  async reloadData() {
    this.menu = [
      {
        id: 'manageCriteria',
        componentName: 'manageCriteria',
        title: 'Управление критериями',
        icon: 'lni lni-layers',
      },
      {
        id: 'manageRate',
        componentName: 'manageRate',
        title: 'Заведение оценок',
        icon: 'lni lni-graph',
      },
    ];
  }
}
