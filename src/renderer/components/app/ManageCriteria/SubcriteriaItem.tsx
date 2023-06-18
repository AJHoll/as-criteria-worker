import './SubcriteriaItem.scss';
import React from 'react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import DevsPanel from '../../../../devs-ui-kit/DevsPanel/DevsPanel';
import DevsInput from '../../../../devs-ui-kit/DevsInput/DevsInput';
import ManageCriteriaStore, { SkillItemData, SubcriteriaItemData } from '../../../stores/ManageCriteriaStore';
import { observer } from 'mobx-react';
import DevsButton from '../../../../devs-ui-kit/DevsButton/DevsButton';
import OAspectItem from './AspectItem';

interface SubcriteriaItemProps extends StoreProps {
  skill: SkillItemData;
  subcriteria: SubcriteriaItemData;
}

export class SubcriteriaItem extends React.Component<SubcriteriaItemProps> {
  manageCriteriaStore: ManageCriteriaStore = this.props.rootStore.manageCriteriaStore;

  render() {
    const { subcriteria, skill } = this.props;
    return (
      <DevsPanel className="app_subcriteria_item">
        <span className="app_subcriteria_item__key">
          {`${skill.key}${subcriteria.order}`}
        </span>
        <div className="app_subcriteria_item__right">
          <div className="app_subcriteria_item__title">
            <label className="app_subcriteria_item__title-order">
              № п.п
              <DevsInput value={subcriteria.order}
                         onChange={(event) => this.manageCriteriaStore.setSubcriteriaOrder(skill.id, subcriteria.id, event.target.value)}
              />
            </label>
            <label className="app_subcriteria_item__title-caption">
              Название субкритерия
              <DevsInput value={subcriteria.caption}
                         onChange={(event) => this.manageCriteriaStore.setSubcriteriaCaption(skill.id, subcriteria.id, event.target.value)}
              />
            </label>
            <DevsButton template="outlined"
                        color="primary"
                        className="app_skill_item__create"
                        icon="lni lni-plus"
                        title="Аспект"
            />
            <DevsButton template="outlined"
                        color="danger"
                        className="app_skill_item__delete"
                        icon="lni lni-trash-can"
                        onClick={() => this.manageCriteriaStore.deleteSubcriteria(skill.id, subcriteria.id)}
            />
          </div>
          <div className="app_subcriteria_item__content">
            {
              subcriteria.aspects.map((aspect) => (
                <OAspectItem key={aspect.id}
                             aspect={aspect}
                             rootStore={this.props.rootStore}
                />
              ))
            }
          </div>
        </div>
      </DevsPanel>
    );
  }
}

const OSubcriteriaItem = observer(SubcriteriaItem);
export default OSubcriteriaItem;
