import './JudgeAspectExtra.scss';
import React from 'react';
import { StoreProps } from '../../../../../interfaces/StoreProps';
import { observer } from 'mobx-react';
import ManageCriteriaStore, {
  AspectItemData,
  SkillItemData,
  SubcriteriaItemData,
} from '../../../../stores/ManageCriteriaStore';
import DevsInput from '../../../../../devs-ui-kit/DevsInput/DevsInput';

interface JudgeAspectExtraProps extends StoreProps {
  skill: SkillItemData;
  subcriteria: SubcriteriaItemData;
  aspect: AspectItemData;
}

export class JudgeAspectExtra extends React.Component<JudgeAspectExtraProps> {
  manageCriteriaStore: ManageCriteriaStore = this.props.rootStore.manageCriteriaStore;

  render() {
    const { skill, subcriteria, aspect } = this.props;
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
                           onChange={(event) => this.manageCriteriaStore.setJudgeAspectExtraDescription(skill.id, subcriteria.id, aspect.id, extra.id, event.target.value)}
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
