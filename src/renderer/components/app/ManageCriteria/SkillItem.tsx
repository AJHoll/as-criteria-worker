import './SkillItem.scss';
import React from 'react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import DevsPanel from '../../../../devs-ui-kit/DevsPanel/DevsPanel';
import DevsInput from '../../../../devs-ui-kit/DevsInput/DevsInput';
import DevsButton from '../../../../devs-ui-kit/DevsButton/DevsButton';
import ManageCriteriaStore, { SkillItemData } from '../../../stores/ManageCriteriaStore';
import { observer } from 'mobx-react';
import OSubcriteriaItem from './SubcriteriaItem';

interface SkillItemProps extends StoreProps {
  skill: SkillItemData;
}

export class SkillItem extends React.Component<SkillItemProps> {
  manageCriteriaStore: ManageCriteriaStore = this.props.rootStore.manageCriteriaStore;

  render() {
    const { skill } = this.props;
    return (
      <DevsPanel className="app_skill_item">
        <div className="app_skill_item__title">
          <label className="app_skill_item__key">
            Ключ
            <DevsInput keyFilter="alpha"
                       value={skill.key}
                       onChange={(event) => this.manageCriteriaStore.setSkillKey(skill.id, event.target.value)}
            />
          </label>
          <label className="app_skill_item__caption">
            Название критерия
            <DevsInput value={skill.caption}
                       onChange={(event) => this.manageCriteriaStore.setSkillCaption(skill.id, event.target.value)}
            />
          </label>
          <label className="app_skill_item_mark">
            Вес
            <DevsInput keyFilter="num"
                       value={skill.mark}
                       onChange={(event) => this.manageCriteriaStore.setSkillMark(skill.id, event.target.value)}
            />
          </label>
          <DevsButton template="outlined"
                      color="primary"
                      className="app_skill_item__create"
                      icon="lni lni-plus"
                      title="Субкритерий"
                      onClick={() => this.manageCriteriaStore.addSubcriteria(skill.id)}
          />
          <DevsButton template="outlined"
                      color="danger"
                      className="app_skill_item__delete"
                      icon="lni lni-trash-can"
                      onClick={() => this.manageCriteriaStore.deleteSkill(skill.id)}
          />
        </div>
        <div className="app_skill_item__content">
          {skill.subcriterias.map((subcriteria) => (
            <OSubcriteriaItem rootStore={this.props.rootStore}
                              key={subcriteria.id}
                              skill={skill}
                              subcriteria={subcriteria}
            />
          ))}
        </div>
      </DevsPanel>
    );
  }
}

const OSkillItem = observer(SkillItem);
export default OSkillItem;
