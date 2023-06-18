import { Store } from '../../interfaces/Store';
import RootStore from './RootStore';
import { SkillItemData } from './ManageCriteriaStore';

export default class ManageRateStore implements Store {
  private readonly _id: string;

  get id(): string {
    return this._id;
  }

  private readonly _rootStore: RootStore;

  get rootStore(): RootStore {
    return this._rootStore;
  }

  private _rates: SkillItemData[] = [];

  get rates(): SkillItemData[] {
    return this._rates;
  }

  set rates(value: SkillItemData[]) {
    this._rates = value;
  }

  constructor(rootStore: RootStore) {
    this._id = 'manageRateStore';
    this._rootStore = rootStore;
  }
}
