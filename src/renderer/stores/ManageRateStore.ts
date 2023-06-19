import { Store } from '../../interfaces/Store';
import RootStore from './RootStore';
import {
  AspectItemData,
  ExtraAspectItemData,
  JudgeScoreItemData,
  SkillItemData,
  SubcriteriaItemData,
} from './ManageCriteriaStore';
import controlsUtil from '../utils/ControlsUtil';

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

  setAspectItemMark(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
    value: AspectItemData['maxMark'],
  ) {
    const skill = this.rates.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          aspect.boolRate = value;
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
    const skill = this.rates.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          const extra = aspect.extraAspect.find((extraItem) => extraItem.id === descretteAspectExtraId);
          if (extra !== undefined) {
            extra.rate = value;
          }
        }
      }
    }
  }

  setJudgeAspectExtraScore(
    skillId: SkillItemData['id'],
    subcriteriaId: SubcriteriaItemData['id'],
    aspectId: AspectItemData['id'],
    judgeAspectExtraId: JudgeScoreItemData['id'],
    expertIndex: number,
    checked: boolean,
  ) {
    const skill = this.rates.find((skill) => skill.id === skillId);
    if (skill !== undefined) {
      const subcriteria = skill.subcriterias.find((subcriteria) => subcriteria.id === subcriteriaId);
      if (subcriteria !== undefined) {
        const aspect = subcriteria.aspects.find((aspect) => aspect.id === aspectId);
        if (aspect !== undefined) {
          const extra = aspect.judgeScore.find((extraItem) => extraItem.id === judgeAspectExtraId);
          if (extra !== undefined) {
            if (checked) {
              if (aspect.judgeRates === undefined) {
                aspect.judgeRates = [];
              }
              aspect.judgeRates[expertIndex] = extra.score;
            }
          }
        }
      }
    }
  }

  clearAll() {
    this.rates.forEach((skill) => {
      skill.mark = '';
      skill.subcriterias.forEach((subcriteria) => {
        subcriteria.aspects.forEach((aspect) => {
          aspect.maxMark = '';
          aspect.judgeRates = [];
          aspect.boolRate = '';
          aspect.extraAspect.forEach((extra) => {
            extra.rate = '';
            extra.mark = '';
          });
        });
      });
    });
    this.rootStore.toastRef?.current?.info(
      'Очистка прошла успешно',
      'Пожалуйста, перезагрузите страницу для применения изменений',
    );
  }

  async saveToJSON() {
    await controlsUtil.saveToJSON(JSON.stringify(this.rates), 'rates-export.json');
    this.rootStore.toastRef?.current?.success('Сохранение прошло успешно');
  }

  async loadFromJSON() {
    const data = await controlsUtil.loadFromJSON();
    if ((data ?? '').length > 0) {
      this.rates = JSON.parse(data);
      this.rootStore.toastRef?.current?.info(
        'Загрузка прошла успешно',
        'Пожалуйста, перезагрузите страницу для применения изменений',
      );
    }
  }
}
