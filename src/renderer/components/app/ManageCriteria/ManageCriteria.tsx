import './ManageCriteria.scss';
import React from 'react';
import { observer } from 'mobx-react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import DevsTabView from '../../../../devs-ui-kit/DevsTab/DevsTabView';
import DevsTabPanel from '../../../../devs-ui-kit/DevsTab/DevsTabPanel';
import DevsButton from '../../../../devs-ui-kit/DevsButton/DevsButton';
import ManageCriteriaStore from '../../../stores/ManageCriteriaStore';
import SkillItem from './SkillItem';

interface ManageCriteriaProps extends StoreProps {
}

export class ManageCriteria extends React.Component<ManageCriteriaProps> {
  manageCriteriaStore: ManageCriteriaStore = this.props.rootStore.manageCriteriaStore;

  render() {
    return (
      <div className="app_manage_criteria">
        <h3>Управление критериями</h3>
        <div className="app_manage_criteria__content">
          <DevsTabView>
            <DevsTabPanel header="Критерии">
              <div className="app_manage_criteria__toolbar">
                <DevsButton template="filled"
                            color="primary"
                            title="Добавить"
                            icon="lni lni-plus"
                            onClick={() => this.manageCriteriaStore.add()}
                />
              </div>
              <div className="skills_container">
                {this.manageCriteriaStore.skills.map((skill) => (
                  <SkillItem rootStore={this.props.rootStore}
                             key={skill.id}
                             skill={skill}
                             onDeleteClicked={(id) => this.manageCriteriaStore.delete(id)}
                             onKeyValueChanged={(id, key) => this.manageCriteriaStore.setKey(id, key)}
                             onCaptionValueChanged={(id, caption) => this.manageCriteriaStore.setCaption(id, caption)}
                             onMarkValueChanged={(id, mark) => this.manageCriteriaStore.setMark(id, mark)}
                  />
                ))}
              </div>
            </DevsTabPanel>
            <DevsTabPanel header="Субкритерии">
              критерии
            </DevsTabPanel>
          </DevsTabView>
        </div>
      </div>
    );
  }
}

const OManageCriteria = observer(ManageCriteria);
export default OManageCriteria;
