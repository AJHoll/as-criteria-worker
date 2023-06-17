import './DevsForm.scss';
import React from 'react';
import DevsFormItem from './DevsFormItem';

export interface FormProps {
  children: React.ReactElement<DevsFormItem> | React.ReactElement<DevsFormItem>[];
  labelflex?: number;
  inputflex?: number;
}

export default class DevsForm extends React.Component<FormProps> {
  render() {
    const { children, labelflex, inputflex } = this.props;
    const mutatedChildren = React.Children.map(children,
      (child: React.ReactElement<DevsFormItem>) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...child.props, labelflex, inputflex } as any);
        }
        return child;
      },
    );
    return (
      <div className="devs_form">
        {mutatedChildren}
      </div>
    );
  }
}
