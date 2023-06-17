import './DevsPassword.scss';
import React from 'react';
import { Password } from 'primereact/password';

export interface DevsPasswordProps {
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
  className?: string;
  invalid?: boolean;
  feedback?: boolean;
}

export interface DevsPasswordState {
  focused: boolean;
  value?: string;
}

export default class DevsPassword extends React.Component<DevsPasswordProps, DevsPasswordState> {
  constructor(props: DevsPasswordProps) {
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
      invalid,
      feedback,
    } = this.props;
    const { focused, value } = this.state;
    return (
      <div
        className={`p-inputgroup devs_password ${className !== undefined ? className : ''} ${focused ? 'devs_focused' : ''} ${disabled ? 'devs_password__disabled' : ''} ${invalid ? 'devs_password__invalid' : ''}`}
      >
        {
          prefixIcon !== undefined ? (
            <div className="p-inputgroup-addon devs_password__prefix_icon">
              <i className={prefixIcon} />
            </div>
          ) : ''
        }
        {
          addonBefore !== undefined ? (
            <div className="p-inputgroup-addon devs_password__addon_before">
              {addonBefore}
            </div>
          ) : ''
        }
        <Password keyfilter={keyFilter}
                  feedback={feedback}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={invalid ? 'p-invalid' : ''}
                  value={value}
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
                  onChange={onChange}
        />
        {
          addonAfter !== undefined ? (
            <div className="p-inputgroup-addon devs_password__addon_after">
              {addonAfter}
            </div>
          ) : ''
        }
        {
          suffixIcon !== undefined ? (
            <div className="p-inputgroup-addon devs_password__suffix_icon">
              <i className={suffixIcon} />
            </div>
          ) : ''
        }
      </div>
    );
  }
}
