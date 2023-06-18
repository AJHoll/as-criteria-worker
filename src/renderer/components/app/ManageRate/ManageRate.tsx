import './ManageRate.scss';
import React from 'react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import { observer } from 'mobx-react';
import ManageRateStore from '../../../stores/ManageRateStore';
import DevsButton from '../../../../devs-ui-kit/DevsButton/DevsButton';
import DevsPanel from '../../../../devs-ui-kit/DevsPanel/DevsPanel';
import { AspectItemData } from '../../../stores/ManageCriteriaStore';
import DevsInput from '../../../../devs-ui-kit/DevsInput/DevsInput';

interface ManageRateProps extends StoreProps {
}

export class ManageRate extends React.Component<ManageRateProps> {
  manageRateStore: ManageRateStore = this.props.rootStore.manageRateStore;

  // eslint-disable-next-line class-methods-use-this
  getAspectExtra(aspect: AspectItemData) {
    switch (aspect.type) {
      case 'D': {
        return (
          <div className="app_aspect_item__extra_item">
            {aspect.extraAspect.map((extra) => (
              <>
                <div className="app_aspect_item__extra_item-description">{extra.description}</div>
                <DevsInput className="app_aspect_item__extra_item-mark" value={extra.mark} />
              </>
            ))}
          </div>
        );
      }
      case 'J': {
        return 'judge';
      }
      default: {
        return '';
      }
    }
  }

  render() {
    return (
      <div className="app_manage_rate">
        <h3>Управление критериями</h3>
        <div className="app_manage_rate__toolbar">
          <DevsButton template="filled"
                      color="success"
                      title="Сформировать XLSX"
                      icon="lni lni-check-box"
                      onClick={() => {
                      }}
          />
        </div>
        <div className="app_manage_rate__content">
          {this.manageRateStore.rates.map((skill) => (
            <DevsPanel className="app_skill_item">
              <div className="app_skill_item__text">
                <div className="app_skill_item__text-key">{skill.key}</div>
              </div>
              <div className="app_skill_item__content">
                <div className="app_skill_item__content-caption">{skill.caption}</div>
                <div className="app_skill_item__content-subcriterias">
                  {skill.subcriterias.map((subcriteria) => (
                    <div className="app_subcriteria_item">
                      <div className="app_subcriteria_item__text">
                        {skill.key + subcriteria.order}
                      </div>
                      <div className="app_subcriteria_item__content">
                        <div className="app_subcriteria_item__content-caption">{subcriteria.caption}</div>
                        <div className="app_subcriteria_item__content-aspects">
                          {subcriteria.aspects.map((aspect) => (
                            <div className="app_aspect_item">
                              <div className="app_aspect_item__text">
                                {`${aspect.type} - ${aspect.caption}`}
                              </div>
                              <div className="app_aspect_item__description">
                                {aspect.description}
                              </div>
                              {
                                aspect.type === 'B'
                                  ? <DevsInput className="app_aspect_item__mark" value={aspect.maxMark} />
                                  : ''
                              }
                              {aspect.type !== 'B'
                                ? (
                                  <div className="app_aspect_item__extra">
                                    {this.getAspectExtra(aspect)}
                                  </div>
                                )
                                : ''}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
