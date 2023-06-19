import './ManageRate.scss';
import React from 'react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import { observer } from 'mobx-react';
import ManageRateStore from '../../../stores/ManageRateStore';
import DevsButton from '../../../../devs-ui-kit/DevsButton/DevsButton';
import DevsPanel from '../../../../devs-ui-kit/DevsPanel/DevsPanel';
import { AspectItemData, SkillItemData, SubcriteriaItemData } from '../../../stores/ManageCriteriaStore';
import DevsInput from '../../../../devs-ui-kit/DevsInput/DevsInput';
import DevsRadioButton from '../../../../devs-ui-kit/DevsRadioButton/DevsRadioButton';

interface ManageRateProps extends StoreProps {
}

export class ManageRate extends React.Component<ManageRateProps> {
  manageRateStore: ManageRateStore = this.props.rootStore.manageRateStore;

  // eslint-disable-next-line class-methods-use-this
  getAspectExtra(
    skill: SkillItemData,
    subcriteria: SubcriteriaItemData,
    aspect: AspectItemData,
  ) {
    switch (aspect.type) {
      case 'D': {
        return (
          <div className="app_aspect_item__extra_item"
               key={`${aspect.id}-extra_item`}
          >
            {aspect.extraAspect.map((extra) => (
              <div key={`${aspect.id}-${extra.id}`}>
                <div key={`${extra.id}-description`}
                     className="app_aspect_item__extra_item-description"
                >
                  {extra.description}
                </div>
                <DevsInput className="app_aspect_item__extra_item-mark"
                           key={`${extra.id}-mark`}
                           value={extra.rate}
                           onChange={(event) => this.manageRateStore.setDescretteAspectExtraMark(skill.id, subcriteria.id, aspect.id, extra.id, event.target.value)}
                />
              </div>
            ))}
          </div>
        );
      }
      case 'J': {
        return [1, 2, 3, 4, 5].map((index) => (
          <div className="app_aspect_item__judge_score"
               key={`${aspect}-judge-score-${index}`}
          >
            <span className="app_aspect_item__judge_score-index">
              {index}
            </span>
            {
              aspect.judgeScore.map((extra) => (
                <div className="app_aspect_item__judge_score_item"
                     key={`${aspect.id}-${extra.id}-${index}`}
                >
                  <DevsRadioButton name={`${aspect.id}-${index}`}
                                   key={`${aspect.id}-${extra.id}-${index}-radio`}
                                   label={extra.score}
                                   labelSide="left"
                                   value={(aspect.judgeRates ?? [])[index] === extra.score}
                                   onChange={(event) => {
                                     this.manageRateStore.setJudgeAspectExtraScore(skill.id, subcriteria.id, aspect.id, extra.id, index, event.target.checked);
                                   }}
                  />
                </div>
              ))
            }
          </div>
        ));
      }
      default: {
        return '';
      }
    }
  }

  render() {
    return (
      <div className="app_manage_rate">
        <h3>Заведение оценок</h3>
        <div className="app_manage_rate__toolbar">
          <DevsButton template="filled"
                      color="secondary"
                      title="Сохранить в JSON"
                      icon="lni lni-upload"
                      onClick={() => this.manageRateStore.saveToJSON()}
          />
          <DevsButton template="filled"
                      color="info"
                      title="Загрузить из JSON"
                      icon="lni lni-download"
                      onClick={() => this.manageRateStore.loadFromJSON()}
          />
          <DevsButton template="filled"
                      disabled
                      color="success"
                      title="Сформировать XLSX"
                      icon="lni lni-check-box"
                      onClick={() => {
                      }}
          />
          <DevsButton template="filled"
                      color="danger"
                      title="Очистить все"
                      icon="lni lni-check-box"
                      onClick={() => this.manageRateStore.clearAll()}
          />
        </div>
        <div className="app_manage_rate__content">
          {this.manageRateStore.rates.map((skill) => (
            <DevsPanel className="app_skill_item"
                       key={skill.id}
            >
              <div className="app_skill_item__text">
                <div className="app_skill_item__text-key">{skill.key}</div>
              </div>
              <div className="app_skill_item__content">
                <div className="app_skill_item__content-caption">{skill.caption}</div>
                <div className="app_skill_item__content-subcriterias">
                  {skill.subcriterias.map((subcriteria) => (
                    <DevsPanel className="app_subcriteria_item"
                               key={subcriteria.id}
                    >
                      <div className="app_subcriteria_item__text">
                        {skill.key + subcriteria.order}
                      </div>
                      <div className="app_subcriteria_item__content">
                        <div className="app_subcriteria_item__content-caption">{subcriteria.caption}</div>
                        <div className="app_subcriteria_item__content-aspects">
                          {subcriteria.aspects.map((aspect) => (
                            <DevsPanel className="app_aspect_item"
                                       key={aspect.id}
                            >
                              <div className="app_aspect_item__labels">
                                <div className="app_aspect_item__labels-caption">
                                  {aspect.caption}
                                </div>
                                <div className="app_aspect_item__labels-description">
                                  {aspect.description}
                                </div>
                                {
                                  aspect.type === 'B'
                                    ? (
                                      <DevsInput className="app_aspect_item__mark"
                                                 key={`${aspect.id}-mark`}
                                                 value={aspect.boolRate}
                                                 onChange={(event) => this.manageRateStore.setAspectItemMark(skill.id, subcriteria.id, aspect.id, event.target.value)}
                                      />
                                    )
                                    : ''
                                }
                                {aspect.type !== 'B'
                                  ? (
                                    <div className="app_aspect_item__extra"
                                         key={`${aspect.id}-extra`}
                                    >
                                      {this.getAspectExtra(skill, subcriteria, aspect)}
                                    </div>
                                  )
                                  : ''}
                              </div>
                            </DevsPanel>
                          ))}
                        </div>
                      </div>
                    </DevsPanel>
                  ))}
                </div>
              </div>
            </DevsPanel>
          ))}
        </div>
      </div>
    );
  }
}

const OManageRate = observer(ManageRate);
export default OManageRate;
