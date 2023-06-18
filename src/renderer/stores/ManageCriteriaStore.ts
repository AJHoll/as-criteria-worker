// eslint-disable-next-line import/no-cycle
import { Store } from '../../interfaces/Store';
import RootStore from './RootStore';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { SelectOption } from '../../devs-ui-kit/DevsSelect/DevsSelect';

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
  extraAspect?: ExtraAspectItemData[];
  judgeScore?: JudgeScoreItemData[];
}

export interface ExtraAspectItemData {
  id: string;
  description: string;
  mark: string;
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

  private _skills: SkillItemData[] = [
    {
      id: uuid(),
      key: 'A',
      caption: 'Общая структура системы',
      mark: '10.00',
      subcriterias: [
        {
          id: uuid(),
          order: '1',
          caption: 'hello world',
          aspects: [
            {
              id: uuid(),
              type: 'B',
              caption: 'После заверешения оформления заявки на складе маршрутной точки отправления появляется материалы  спецификации заявки.',
              description: '',
              maxMark: '2',
            },
            {
              id: uuid(),
              type: 'D',
              caption: 'Транспортная накладная формируется корректно и содержит все требуемые атриубты',
              description: 'Минус 0,5 балл за каждый некорректный атрибут',
              maxMark: '2',
              extraAspect: [
                {
                  id: uuid(),
                  description: 'Минус что нибудь за ошибку',
                  mark: '0.5',
                },
              ],
            },
            {
              id: uuid(),
              type: 'J',
              caption: 'Транспортная накладная формируется корректно и содержит все требуемые атриубты',
              description: 'Просмотреть что нибудь как нибудь',
              maxMark: '2',
              judgeScore: [
                {
                  id: uuid(),
                  description: 'Все очень плохо',
                  score: '0',
                },
                {
                  id: uuid(),
                  description: 'Все не очень плохо',
                  score: '1',
                },
                {
                  id: uuid(),
                  description: 'Все очень неплохо',
                  score: '2',
                },
                {
                  id: uuid(),
                  description: 'Все замечательно',
                  score: '3',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

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
    let newSkillKey = [...this.skills].sort((a, b) => {
      return this.alphabet.lastIndexOf(b.key) - this.alphabet.lastIndexOf(a.key);
    })[0]?.key;
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
}
