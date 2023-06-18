import './DescretteAspectExtra.scss';
import React from 'react';
import { StoreProps } from '../../../../../interfaces/StoreProps';
import { observer } from 'mobx-react';
import ManageCriteriaStore, {
  AspectItemData,
  SkillItemData,
  SubcriteriaItemData,
} from '../../../../stores/ManageCriteriaStore';
import DevsButton from '../../../../../devs-ui-kit/DevsButton/DevsButton';
import DevsInput from '../../../../../devs-ui-kit/DevsInput/DevsInput';

interface DescretteAspectExtraProps extends StoreProps {
  skill: SkillItemData;
  subcriteria: SubcriteriaItemData;
  aspect: AspectItemData;
}

export class DescretteAspectExtra extends React.Component<DescretteAspectExtraProps> {
  manageCriteriaStore: ManageCriteriaStore = this.props.rootStore.manageCriteriaStore;

  render() {
    const { skill, subcriteria, aspect } = this.props;
    return (
      <div className="app_descrette_aspect_extra">
        <div className="app_descrette_aspect_extra__toolbar">
          <DevsButton template="outlined"
                      color="primary"
                      className="app_descrette_aspect_extra__toolbar-create"
                      icon="lni lni-plus"
                      title="Тип ошибки"
                      onClick={() => this.manageCriteriaStore.addDescretteAspectExtra(skill.id, subcriteria.id, aspect.id)}
          />
        </div>
        <div className="app_descrette_aspect_extra__content">
          {
            this.props.aspect.extraAspect?.map((extra) => (
              <div className="app_descrette_aspect_extra_item"
                   key={extra.id}
              >
                <label className="app_descrette_aspect_extra_item__description">
                  Описание
                  <DevsInput value={extra.description}
                             onChange={(event) => this.manageCriteriaStore.setDescretteAspectExtraDescription(skill.id, subcriteria.id, aspect.id, extra.id, event.target.value)}
                  />
                </label>
                <label className="app_descrette_aspect_extra_item__mark">
                  Вес ошибки
                  <DevsInput value={extra.mark}
                             onChange={(event) => this.manageCriteriaStore.setDescretteAspectExtraMark(skill.id, subcriteria.id, aspect.id, extra.id, event.target.value)}
                  />
                </label>
                <DevsButton template="outlined"
                            color="danger"
                            className="app_descrette_aspect_extra_item__delete"
                            icon="lni lni-trash-can"
                            onClick={() => this.manageCriteriaStore.deleteDescretteAspectExtra(skill.id, subcriteria.id, aspect.id, extra.id)}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const ODescretteAspectExtra = observer(DescretteAspectExtra);
export default ODescretteAspectExtra;
