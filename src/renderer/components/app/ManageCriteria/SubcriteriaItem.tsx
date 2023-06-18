import './SubcriteriaItem.scss';
import React from 'react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import DevsPanel from '../../../../devs-ui-kit/DevsPanel/DevsPanel';
import DevsInput from '../../../../devs-ui-kit/DevsInput/DevsInput';
import ManageCriteriaStore, { SkillItemData, SubcriteriaItemData } from '../../../stores/ManageCriteriaStore';
import { observer } from 'mobx-react';
import DevsButton from '../../../../devs-ui-kit/DevsButton/DevsButton';
import OAsperctItem from './AsperctItem';

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
              <DevsInput value={subcriteria.order} />
            </label>
            <label className="app_subcriteria_item__title-caption">
              Название субкритерия
              <DevsInput value={subcriteria.caption} />
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
            />
          </div>
          <div className="app_subcriteria_item__content">
            {
              subcriteria.aspects.map((aspect) => (
                <OAsperctItem key={aspect.id}
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
