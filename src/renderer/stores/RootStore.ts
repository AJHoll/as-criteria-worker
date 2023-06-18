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
import ManageRateStore from './ManageRateStore';

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
  readonly manageRateStore: ManageRateStore;

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
    this.manageRateStore = new ManageRateStore(this);
    this._toastRef = null;

    this.deserializeData();
    this.serializeTimerId = setInterval(() => {
      this.serializeData();
    }, 1000);
    // make all autoobservable
    makeAutoObservable(this);
  }

  serializeData() {
    window.localStorage.setItem(
      'data',
      JSON.stringify({
        criterias: this.manageCriteriaStore.skills,
        rates: this.manageRateStore.rates,
      }),
    );
  }

  deserializeData() {
    const data = window.localStorage.getItem('data');
    if (data !== null) {
      this.manageCriteriaStore.skills = JSON.parse(data).criterias;
      this.manageRateStore.rates = JSON.parse(data).rates;
    }
  }
}
