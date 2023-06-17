import './DevsInput.scss';
import React from 'react';
import { InputText } from 'primereact/inputtext';

export interface InputProps {
  keyFilter?: 'pint' | 'int' | 'pnum' | 'money' | 'num' | 'hex' | 'email' | 'alpha' | 'alphanum';
  placeholder?: string;
  value?: string;
  addonBefore?: React.ReactElement;
  addonAfter?: React.ReactElement;
  prefixIcon?: string;
  suffixIcon?: string;
  disabled?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  invalid?: boolean;
}

export interface InputState {
  focused: boolean;
  value?: string;
}

export default class DevsInput extends React.Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
    this.state = {
      focused: false,
      value: this.props.value,
    };
  }

  render() {
    const {
      keyFilter,
      placeholder,
      addonBefore,
      addonAfter,
      prefixIcon,
      suffixIcon,
      disabled,
      className,
      onFocus,
      onBlur,
      onChange,
      onKeyUp,
      invalid,
    } = this.props;
    const { focused, value } = this.state;
    return (
      <div
        className={`p-inputgroup devs_input ${className !== undefined ? className : ''} ${focused ? 'devs_focused' : ''} ${disabled ? 'devs_input__disabled' : ''} ${invalid ? 'devs_input__invalid' : ''}`}
      >
        {
          prefixIcon !== undefined ? (
            <div className="p-inputgroup-addon devs_input__prefix_icon">
              <i className={prefixIcon} />
            </div>
          ) : ''
        }
        {
          addonBefore !== undefined ? (
            <div className="p-inputgroup-addon devs_input__addon_before">
              {addonBefore}
            </div>
          ) : ''
        }
        <InputText keyfilter={keyFilter}
                   placeholder={placeholder}
                   disabled={disabled}
                   className={invalid ? 'p-invalid' : ''}
                   defaultValue={value}
                   onKeyUp={onKeyUp}
                   onFocus={(event) => {
                     this.setState({ focused: true }, () => {
                       if (onFocus !== undefined) {
                         onFocus(event);
                       }
                     });
                   }}
                   onBlur={(event) => {
                     this.setState({ focused: false }, () => {
                       if (onBlur !== undefined) {
                         onBlur(event);
                       }
                     });
                   }}
                   onChange={(event) => {
                     this.setState({ value: event.target.value }, () => {
                       if (onChange !== undefined) {
                         onChange(event);
                       }
                     });
                   }}
        />
        {
          addonAfter !== undefined ? (
            <div className="p-inputgroup-addon devs_input__addon_after">
              {addonAfter}
            </div>
          ) : ''
        }
        {
          suffixIcon !== undefined ? (
            <div className="p-inputgroup-addon devs_input__suffix_icon">
              <i className={suffixIcon} />
            </div>
          ) : ''
        }
      </div>
    );
  }
}
