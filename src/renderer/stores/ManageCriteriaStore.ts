// eslint-disable-next-line import/no-cycle
import { Store } from '../../interfaces/Store';
import RootStore from './RootStore';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';

export interface SkillItemData {
  id: string;
  key: string;
  caption: string;
  mark: string;
}

export default class ManageCriteriaStore implements Store {
  private readonly _id: string;

  get id(): string {
    return this._id;
  }

  private readonly _rootStore: RootStore;

  get rootStore(): RootStore {
    return this._rootStore;
  }

  private _skills: SkillItemData[] = [
    {
      id: uuid(),
      key: 'A',
      caption: 'Общая структура системы',
      mark: '10.00',
    },
  ];

  get skills(): SkillItemData[] {
    return this._skills;
  }

  set skills(value: SkillItemData[]) {
    this._skills = value;
  }

  setKey(id: string, key: SkillItemData['key']) {
    const item = this.skills.find((skill) => skill.id === id);
    if (item !== undefined) {
      item.key = key;
    }
  }

  setCaption(id: string, caption: SkillItemData['caption']) {
    const item = this.skills.find((skill) => skill.id === id);
    if (item !== undefined) {
      item.caption = caption;
    }
  }

  setMark(id: string, mark: SkillItemData['mark']) {
    const item = this.skills.find((skill) => skill.id === id);
    if (item !== undefined) {
      item.mark = mark;
    }
  }

  constructor(rootStore: RootStore) {
    this._id = 'manageCriteriaStore';
    this._rootStore = rootStore;
    makeAutoObservable(this);
  }

  add(): void {
    this.skills.push({ id: uuid(), key: '', caption: '', mark: '' });
  }

  delete(id: string): void {
    this.skills = this.skills.filter((skill) => skill.id !== id);
  }
}
