import './DevsRadioButton.scss';
import React from 'react';

export interface RadioButtonProps {
  name: string;
  label?: string;
  labelSide?: string;
  value?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioButtonState {
  checked: boolean;
}

export default class DevsRadioButton extends React.Component<RadioButtonProps, RadioButtonState> {
  constructor(props: RadioButtonProps) {
    super(props);
    this.state = {
      checked: props.value ?? true,
    };
  }

  render() {
    const { name, label, labelSide, disabled, invalid, onChange } = this.props;
    const { checked } = this.state;
    return (
      <label
        className={`devs_radiobutton ${disabled ? 'devs_radiobutton__disabled' : ''} ${invalid ? 'devs_radiobutton__invalid' : ''}`}
      >
        {labelSide === 'left' ? <span className="devs_radiobutton__label">{label}</span> : ''}
        <input className={`devs_radiobutton__item ${disabled ? 'devs_radiobutton__item-disabled' : ''}`}
               type="radio"
               name={name}
               defaultChecked={checked}
               disabled={disabled}
               onChange={(event) => {
                 this.setState({ checked: !checked });
                 if (onChange !== undefined) {
                   onChange(event);
                 }
               }}
        />
        {labelSide === 'right' ? <span className="devs_radiobutton__label">{label}</span> : ''}
      </label>
    );
  }
}
