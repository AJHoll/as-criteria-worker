// eslint-disable-next-line import/no-cycle
import { Store } from '../../interfaces/Store';
import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import WindowTabBarStore from './WindowTabBarStore';
// eslint-disable-next-line import/no-cycle
import DevsToast from '../../devs-ui-kit/DevsToast/DevsToast';
import React from 'react';
// eslint-disable-next-line import/no-cycle
import MainMenuStore from './MainMenuStore';
// eslint-disable-next-line import/no-cycle
import ManageCriteriaStore from './ManageCriteriaStore';

export default class RootStore implements Store {
  private readonly _id: string;

  get id(): string {
    return this._id;
  }

  private readonly _rootStore: RootStore;

  get rootStore(): RootStore {
    return this._rootStore;
  }

  private _activeComponentName: string;

  get activeComponentName(): string {
    return this._activeComponentName;
  }

  set activeComponentName(value: string) {
    this._activeComponentName = value;
  }

  readonly windowTabBarStore: WindowTabBarStore;

  readonly mainMenuStore: MainMenuStore;

  readonly manageCriteriaStore: ManageCriteriaStore;

  private _toastRef: React.RefObject<DevsToast> | null;

  get toastRef(): React.RefObject<DevsToast> | null {
    return this._toastRef;
  }

  set toastRef(value: React.RefObject<DevsToast> | null) {
    this._toastRef = value;
  }

  readonly serializeTimerId;

  constructor() {
    this._id = 'rootStore';
    this._rootStore = this;
    this._activeComponentName = 'mainPage';
    // others stores
    this.windowTabBarStore = new WindowTabBarStore(this);
    this.mainMenuStore = new MainMenuStore(this);
    this.manageCriteriaStore = new ManageCriteriaStore(this);
    this._toastRef = null;
    // make all autoobservable
    makeAutoObservable(this);
    this.serializeTimerId = setInterval(() => {
      this.serializeData();
    }, 1000);
  }

  serializeData() {
    window.localStorage.setItem(
      'data',
      JSON.stringify({
        skills: this.manageCriteriaStore.skills,
      }),
    );
  }
}
