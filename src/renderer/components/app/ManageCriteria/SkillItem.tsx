import './SkillItem.scss';
import React from 'react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import DevsPanel from '../../../../devs-ui-kit/DevsPanel/DevsPanel';
import DevsInput from '../../../../devs-ui-kit/DevsInput/DevsInput';
import DevsButton from '../../../../devs-ui-kit/DevsButton/DevsButton';
import { SkillItemData } from '../../../stores/ManageCriteriaStore';

interface SkillItemProps extends StoreProps {
  skill: SkillItemData;
  onDeleteClicked?: (id: string) => void;
  onKeyValueChanged?: (id: string, key: string) => void;
  onCaptionValueChanged?: (id: string, caption: string) => void;
  onMarkValueChanged?: (id: string, mark: string) => void;
}

export default class SkillItem extends React.Component<SkillItemProps> {
  render() {
    const {
      skill,
      onDeleteClicked,
      onKeyValueChanged,
      onCaptionValueChanged,
      onMarkValueChanged,
    } = this.props;
    return (
      <DevsPanel className="app_skill_item">
        <label className="app_skill_item__key">
          Ключ
          <DevsInput keyFilter="alpha"
                     value={skill.key}
                     onChange={(event) => {
                       if (onKeyValueChanged !== undefined) {
                         onKeyValueChanged(skill.id, event.target.value);
                       }
                     }}
          />
        </label>
        <label className="app_skill_item__caption">
          Название критерия
          <DevsInput value={skill.caption}
                     onChange={(event) => {
                       if (onCaptionValueChanged !== undefined) {
                         onCaptionValueChanged(skill.id, event.target.value);
                       }
                     }}
          />
        </label>
        <label className="app_skill_item_mark">
          Вес
          <DevsInput keyFilter="num"
                     value={skill.mark}
                     onChange={(event) => {
                       if (onMarkValueChanged !== undefined) {
                         onMarkValueChanged(skill.id, event.target.value);
                       }
                     }}
          />
        </label>
        <DevsButton template="outlined"
                    color="danger"
                    className="app_skill_item__delete"
                    icon="lni lni-trash-can"
                    title="Удалить"
                    onClick={() => {
                      if (onDeleteClicked !== undefined) {
                        onDeleteClicked(skill.id);
                      }
                    }}
        />
      </DevsPanel>
    );
  }
}
