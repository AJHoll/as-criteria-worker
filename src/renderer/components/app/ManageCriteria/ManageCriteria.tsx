import './ManageCriteria.scss';
import React from 'react';
import { observer } from 'mobx-react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import DevsButton from '../../../../devs-ui-kit/DevsButton/DevsButton';
import ManageCriteriaStore from '../../../stores/ManageCriteriaStore';
import OSkillItem from './SkillItem';

interface ManageCriteriaProps extends StoreProps {
}

export class ManageCriteria extends React.Component<ManageCriteriaProps> {
  manageCriteriaStore: ManageCriteriaStore = this.props.rootStore.manageCriteriaStore;

  render() {
    return (
      <div className="app_manage_criteria">
        <h3>Управление критериями</h3>
        <div className="app_manage_criteria__content">
          <div className="app_manage_criteria__toolbar">
            <DevsButton template="filled"
                        color="primary"
                        title="Добавить критерий"
                        icon="lni lni-plus"
                        onClick={() => this.manageCriteriaStore.addSkill()}
            />
            <DevsButton template="filled"
                        color="secondary"
                        title="Сохранить в JSON"
                        icon="lni lni-upload"
                        onClick={() => this.manageCriteriaStore.saveToJSON()}
            />
            <DevsButton template="filled"
                        color="info"
                        title="Загрузить из JSON"
                        icon="lni lni-download"
                        onClick={() => this.manageCriteriaStore.loadFromJSON()}
            />
            <DevsButton template="filled"
                        color="success"
                        title="Сформировать лист проверки"
                        icon="lni lni-check-box"
                        onClick={() => this.manageCriteriaStore.generateMarkList()}
            />
          </div>
          <div className="app_skills_container">
            {this.manageCriteriaStore.skills.map((skill) => (
              <OSkillItem rootStore={this.props.rootStore} key={skill.id} skill={skill} />))}
          </div>
        </div>
      </div>
    );
  }
}

const OManageCriteria = observer(ManageCriteria);
export default OManageCriteria;
