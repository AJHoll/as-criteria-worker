import './DevsCheckbox.scss';
import React, { CSSProperties } from 'react';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';

export interface CheckboxProps {
  label?: string;
  labelSide?: 'left' | 'right';
  value?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  onChange?: (event: CheckboxChangeEvent) => void;
  style?: CSSProperties;
}

export interface CheckboxState {
  checked: boolean;
}

export default class DevsCheckbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: any) {
    super(props);
    this.state = {
      checked: this.props.value ?? false,
    };
  }

  render() {
    const {
      label, labelSide, disabled, invalid, style,
      onChange,
    } = this.props;
    const { checked } = this.state;
    return (
      <label
        className={`devs_checkbox ${disabled ? 'devs_checkbox__disabled' : ''} ${invalid ? 'devs_checkbox__invalid' : ''}`}
        style={style}
      >
        {labelSide === 'left' ? <span className="devs_checkbox__label">{label}</span> : ''}
        <Checkbox checked={checked}
                  disabled={disabled}
                  className={invalid ? 'p-invalid' : ''}
                  onChange={(event) => {
                    this.setState({ checked: !checked });
                    if (onChange !== undefined) {
                      onChange(event);
                    }
                  }}
        />
        {labelSide === 'right' ? <span className="devs_checkbox__label">{label}</span> : ''}
      </label>
    );
  }
}
