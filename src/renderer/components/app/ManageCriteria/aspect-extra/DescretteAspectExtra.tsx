import './DescretteAspectExtra.scss';
import React from 'react';
import { StoreProps } from '../../../../../interfaces/StoreProps';
import { observer } from 'mobx-react';
import { AspectItemData } from '../../../../stores/ManageCriteriaStore';
import DevsButton from '../../../../../devs-ui-kit/DevsButton/DevsButton';
import DevsInput from '../../../../../devs-ui-kit/DevsInput/DevsInput';

interface DescretteAspectExtraProps extends StoreProps {
  aspect: AspectItemData;
}

export class DescretteAspectExtra extends React.Component<DescretteAspectExtraProps> {
  render() {
    return (
      <div className="app_descrette_aspect_extra">
        <div className="app_descrette_aspect_extra__toolbar">
          <DevsButton template="outlined"
                      color="primary"
                      className="app_descrette_aspect_extra__toolbar-create"
                      icon="lni lni-plus"
                      title="Тип ошибки"
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
                  <DevsInput value={extra.description} />
                </label>
                <label className="app_descrette_aspect_extra_item__mark">
                  Вес ошибки
                  <DevsInput value={extra.mark} />
                </label>
                <DevsButton template="outlined"
                            color="danger"
                            className="app_descrette_aspect_extra_item__delete"
                            icon="lni lni-trash-can"
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
