import './AspectItem.scss';
import React from 'react';
import { observer } from 'mobx-react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import ManageCriteriaStore, { AspectItemData } from '../../../stores/ManageCriteriaStore';
import ODescretteAspectItem from './aspect-extra/DescretteAspectExtra';
import OJudgeAspectItem from './aspect-extra/JudgeAspectExtra';
import DevsPanel from '../../../../devs-ui-kit/DevsPanel/DevsPanel';
import DevsSelect from '../../../../devs-ui-kit/DevsSelect/DevsSelect';
import DevsTextArea from '../../../../devs-ui-kit/DevsTextArea/DevsTextArea';
import DevsInput from '../../../../devs-ui-kit/DevsInput/DevsInput';
import DevsButton from '../../../../devs-ui-kit/DevsButton/DevsButton';

export interface AspectItemProps extends StoreProps {
  aspect: AspectItemData;
}

export class AspectItem extends React.Component<AspectItemProps> {
  manageCriteriaStore: ManageCriteriaStore = this.props.rootStore.manageCriteriaStore;

  get aspectNode(): React.ReactElement | React.ReactElement[] | any {
    switch (this.props.aspect.type) {
      case 'D': {
        return [
          (<ODescretteAspectItem key={this.props.aspect.id}
                                 rootStore={this.props.rootStore}
                                 aspect={this.props.aspect}
          />),
        ];
      }
      case 'J': {
        return [
          (<OJudgeAspectItem key={this.props.aspect.id}
                             rootStore={this.props.rootStore}
                             aspect={this.props.aspect}
          />),
        ];
      }
      default: {
        return [];
      }
    }
  }

  render() {
    const { aspect } = this.props;
    const { aspectOptions } = this.manageCriteriaStore;
    return (
      <DevsPanel className="app_aspect_item">
        <div className="app_aspect_item__common">
          <label className="app_aspect_item__common-type">
            Тип аспекта
            <DevsSelect value={aspectOptions.find((option) => option.value === aspect.type)}
                        onlySelection
                        forceSelection
                        options={aspectOptions}
            />
          </label>
          <label className="app_aspect_item__common-caption">
            Название аспекта
            <DevsTextArea value={aspect.caption} />
          </label>
          <label className="app_aspect_item__common-description">
            Описание аспекта
            <DevsTextArea value={aspect.description} />
          </label>
          <label className="app_aspect_item__common-mark">
            Максимальный вес
            <DevsInput value={aspect.maxMark} />
          </label>
          <DevsButton template="outlined"
                      color="danger"
                      className="app_aspect_item__common-delete"
                      icon="lni lni-trash-can"
          />
        </div>
        {
          (this.aspectNode?.length ?? 0) > 0
            ? (
              <div className="app_aspect_item__extra">
                {this.aspectNode}
              </div>
            )
            // eslint-disable-next-line react/jsx-no-useless-fragment
            : <></>
        }
      </DevsPanel>
    );
  }
}

const OAspectItem = observer(AspectItem);
export default OAspectItem;
