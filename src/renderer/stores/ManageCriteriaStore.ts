// eslint-disable-next-line import/no-cycle
import { Store } from '../../interfaces/Store';
import RootStore from './RootStore';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { SelectOption } from '../../devs-ui-kit/DevsSelect/DevsSelect';
import controlsUtil from '../utils/ControlsUtil';

export interface SkillItemData {
  id: string;
  key: string;
  caption: string;
  mark: string;
  subcriterias: SubcriteriaItemData[];
}

export interface SubcriteriaItemData {
  id: string;
  order: string;
  caption: string;
  aspects: AspectItemData[];
}

export interface AspectItemData {
  id: string;
  type: 'B' | 'D' | 'J';
  caption: string;
  description?: string;
  sectionKey?: string;
  maxMark: string;
  extraAspect: ExtraAspectItemData[];
  judgeScore: JudgeScoreItemData[];
  boolRate?: string;
  judgeRates?: string[];
}

export interface ExtraAspectItemData {
  id: string;
  description: string;
  mark: string;
  rate?: string;
}

export interface JudgeScoreItemData {
  id: string;
  description: string;
  score: string;
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

  private _skills: SkillItemData[] = [];

  get skills(): SkillItemData[] {
    return this._skills;
  }

  set skills(value: SkillItemData[]) {
    this._skills = value;
  }

  // eslint-disable-next-line class-methods-use-this
  get aspectOptions(): SelectOption[] {
    return [
      {
        label: 'Бинарный',
        value: 'B',
      },
      {
        label: 'Дискретный',
        value: 'D',
      },
      {
        label: 'Судейский',
        value: 'J',
      },
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  get alphabet(): string {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  constructor(rootStore: RootStore) {
    this._id = 'manageCriteriaStore';
    this._rootStore = rootStore;
    makeAutoObservable(this);
  }

  addSkill(): void {
    let newSkillKey = [...this.skills].sort((a, b) => this.alphabet.lastIndexOf(b.key) - this.alphabet.lastIndexOf(a.key))[0]?.key;
    newSkillKey = this.alphabet.charAt(this.alphabet.lastIndexOf(newSkillKey) + 1);
    this.skills.push({ id: uuid(), key: newSkillKey, caption: '', mark: '', subcriterias: [] });
  }

  deleteSkill(id: string): void {
    this.skills = this.skills.filter((skill) => skill.id !== id);
  }

  setSkillKey(id: string, key: SkillItemData['key']) {
    const item = this.skills.find((skill) => skill.id === id);
    if (item !== undefined) {
      item.key = key;
      item.subcriterias = [...item.subcriterias.map((e) => ({ ...e }))];
    }
  }

  setSkillCaption(id: string, caption: SkillItemData['caption']) {
    const item = this.skills.find((skill) => skill.id === id);
    if (item !== undefined) {
      item.caption = caption;
    }
  }

  setSkillMark(id: string, mark: SkillItemData['mark']) {
    const item = this.skills.find((skill) => skill.id === id);
    if (item !== undefined) {
      item.mark = mark;
    }
  }

  addSubcriteria(skillId: string) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const maxOrder = [...skill.subcriterias].sort((a, b) => +(b?.order ?? 0) - +(a?.order ?? 0))[0]?.order;
      skill.subcriterias.push({
        id: uuid(),
        order: (+(maxOrder ?? '0') + 1).toString(),
        caption: '',
        aspects: [],
      });
    }
  }

  deleteSubcriteria(skillId: SkillItemData['id'], subcriteriaId: SubcriteriaItemData['id']) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      skill.subcriterias = skill.subcriterias.filter((subcriteria) => subcriteria.id !== subcriteriaId);
    }
  }

  setSubcriteriaOrder(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    value: SubcriteriaItemData['order'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        subcriteria.order = value;
        if (value !== undefined) {
          skill.subcriterias.sort((a, b) => +a.order - +b.order);
        }
      }
    }
  }

  setSubcriteriaCaption(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    value: SubcriteriaItemData['caption'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        subcriteria.caption = value;
      }
    }
  }

  addAspect(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        subcriteria.aspects.push({
          id: uuid(),
          type: 'B',
          caption: '',
          description: '',
          maxMark: '',
          extraAspect: [],
          judgeScore: [],
        });
      }
    }
  }

  deleteAspect(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        subcriteria.aspects = subcriteria.aspects.filter((aspect) => aspect.id !== aspectId);
      }
    }
  }

  setAspectType(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
    value: AspectItemData['type'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          if (aspect.type !== value) {
            aspect.type = value;
            if (aspect.type === 'J') {
              aspect.judgeScore = [
                { id: uuid(), description: '', score: '0' },
                { id: uuid(), description: '', score: '1' },
                { id: uuid(), description: '', score: '2' },
                { id: uuid(), description: '', score: '3' },
              ];
              aspect.extraAspect = [];
            }
            if (aspect.type === 'D') {
              aspect.extraAspect = [
                { id: uuid(), description: '', mark: '' },
              ];
              aspect.judgeScore = [];
            }
            if (aspect.type === 'B') {
              aspect.extraAspect = [];
              aspect.judgeScore = [];
            }
          }
        }
      }
    }
  }

  setAspectCaption(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
    value: AspectItemData['caption'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          aspect.caption = value;
        }
      }
    }
  }

  setAspectDescription(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
    value: AspectItemData['description'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          aspect.description = value;
        }
      }
    }
  }

  setAspectMaxMark(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
    value: AspectItemData['maxMark'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          aspect.maxMark = value;
        }
      }
    }
  }

  addDescretteAspectExtra(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          aspect.extraAspect.push({
            id: uuid(), description: '', mark: '',
          });
        }
      }
    }
  }

  deleteDescretteAspectExtra(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
    descretteAspectExtraId: ExtraAspectItemData['id'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          aspect.extraAspect = aspect.extraAspect.filter((extra) => extra.id !== descretteAspectExtraId);
        }
      }
    }
  }

  setDescretteAspectExtraDescription(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
    descretteAspectExtraId: ExtraAspectItemData['id'],
    value: ExtraAspectItemData['description'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          const extra = aspect.extraAspect.find((extraItem) => extraItem.id === descretteAspectExtraId);
          if (extra !== undefined) {
            extra.description = value;
          }
        }
      }
    }
  }

  setDescretteAspectExtraMark(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
    descretteAspectExtraId: ExtraAspectItemData['id'],
    value: ExtraAspectItemData['mark'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          const extra = aspect.extraAspect.find((extraItem) => extraItem.id === descretteAspectExtraId);
          if (extra !== undefined) {
            extra.mark = value;
          }
        }
      }
    }
  }

  setJudgeAspectExtraDescription(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
    judgeAspectExtraId: JudgeScoreItemData['id'],
    value: JudgeScoreItemData['description'],
  ) {
    const skill = this.skills.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          const extra = aspect.judgeScore.find((extraItem) => extraItem.id === judgeAspectExtraId);
          if (extra !== undefined) {
            extra.description = value;
          }
        }
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async saveToJSON() {
    await controlsUtil.saveToJSON(JSON.stringify(this.skills), 'criterias-export.json');
    this.rootStore.toastRef?.current?.success('Сохранение прошло успешно');
  }

  async loadFromJSON() {
    const data = await controlsUtil.loadFromJSON();
    if ((data ?? '').length > 0) {
      this.skills = JSON.parse(data);
      this.rootStore.toastRef?.current?.info(
        'Загрузка прошла успешно',
        'Пожалуйста, перезагрузите страницу для применения изменений',
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async loadFromXLSX(): Promise<void> {
    this.skills = await controlsUtil.loadFromXLSX();
  }

  generateMarkList() {
    this.rootStore.manageRateStore.rates = JSON.parse(JSON.stringify(this.skills));
    this.skills = [];
    this.rootStore.toastRef?.current?.success(
      'Формирование листа завершено',
      'Пройдите в раздел "Заведения оценок" для дальнейшей работы',
    );
  }
}
