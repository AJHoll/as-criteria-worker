import './DevsFormItem.scss';
import React from 'react';

interface FormItemProps {
  label: string;
  children: React.ReactElement;
  labelflex?: number;
  inputflex?: number;
}

export default class DevsFormItem extends React.Component<FormItemProps> {
  render() {
    const { label, children, labelflex, inputflex } = this.props;
    return (
      <div className="devs_form_item">
        <div className="devs_form_item__label" style={{ flex: labelflex ?? 2 }}>
          {(`${label}:`).replaceAll('::', ':')}
        </div>
        <div className="devs_form_item__input" style={{ flex: inputflex ?? 3 }}>
          {children}
        </div>
      </div>
    );
  }
}
