import './DevsTextArea.scss';
import React from 'react';

export interface TextAreaProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  invalid?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface TextAreaState {
  focused: boolean;
  value: string | number | undefined;
}

export default class DevsTextArea extends React.Component<TextAreaProps, TextAreaState> {
  constructor(props: TextAreaProps) {
    super(props);
    this.state = {
      focused: false,
      value: this.props.value,
    };
  }

  render() {
    const { placeholder, disabled, invalid, onFocus, onBlur, onChange } = this.props;
    const { focused, value } = this.state;
    return (
      <textarea
        className={`devs_textarea ${focused ? 'devs_focused' : ''} ${disabled ? 'devs_textarea__disabled' : ''} ${invalid ? 'devs_textarea__invalid' : ''}`}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          this.setState({ value: event.target.value });
          if (onChange !== undefined) {
            onChange(event);
          }
        }}
        onFocus={(event) => {
          this.setState({ focused: true });
          if (onFocus !== undefined) {
            onFocus(event);
          }
        }}
        onBlur={(event) => {
          this.setState({ focused: false });
          if (onBlur !== undefined) {
            onBlur(event);
          }
        }}
      />
    );
  }
}
