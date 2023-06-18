import './JudgeAspectExtra.scss';
import React from 'react';
import { StoreProps } from '../../../../../interfaces/StoreProps';
import { observer } from 'mobx-react';
import { AspectItemData } from '../../../../stores/ManageCriteriaStore';
import DevsInput from '../../../../../devs-ui-kit/DevsInput/DevsInput';

interface JudgeAspectExtraProps extends StoreProps {
  aspect: AspectItemData;
}

export class JudgeAspectExtra extends React.Component<JudgeAspectExtraProps> {
  render() {
    return (
      <div className="app_judge_aspect_extra">
        {
          this.props.aspect.judgeScore?.map((extra) => (
            <div className="app_judge_aspect_extra_item"
                 key={extra.id}
            >
              <label className="app_judge_aspect_extra_item__description">
                <DevsInput value={extra.description}
                           addonBefore={(
                             <span className="app_judge_aspect_extra_item__score">
                               {extra.score}
                             </span>
                           )}
                />
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

const OJudgeAspectExtra = observer(JudgeAspectExtra);
export default OJudgeAspectExtra;
