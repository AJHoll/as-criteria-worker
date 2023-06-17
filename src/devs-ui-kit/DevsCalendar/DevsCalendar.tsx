import './DevsCalendar.scss';
import React from 'react';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';

interface DevsCalendarProps {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
  addonBefore?: React.ReactElement;
  addonAfter?: React.ReactElement;
  prefixIcon?: string;
  suffixIcon?: string;
  value?: Date;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: CalendarChangeEvent) => void;
  appendTo?: 'self' | HTMLElement | null | undefined;
}

interface DevsCalendarState {
  focused: boolean;
  value?: Date
}

export default class DevsCalendar extends React.Component<DevsCalendarProps, DevsCalendarState> {
  constructor(props: DevsCalendarProps) {
    super(props);

    this.state = {
      focused: false,
      value: props.value,
    };
  }

  render() {
    const {
      addonBefore, addonAfter, prefixIcon, suffixIcon, placeholder, appendTo,
      disabled, invalid, className, onFocus, onBlur, onChange,
    } = this.props;
    const { focused, value } = this.state;
    return (
      <div
        className={`p-inputgroup devs_calendar ${className !== undefined ? className : ''} ${focused ? 'devs_focused' : ''} ${disabled ? 'devs_calendar__disabled' : ''} ${invalid ? 'devs_calendar__invalid' : ''}`}
      >
        {
          prefixIcon !== undefined ? (
            <div className="p-inputgroup-addon devs_calendar__prefix_icon">
              <i className={prefixIcon} />
            </div>
          ) : ''
        }
        {
          addonBefore !== undefined ? (
            <div className="p-inputgroup-addon devs_calendar__addon_before">
              {addonBefore}
            </div>
          ) : ''
        }
        <Calendar appendTo={appendTo ?? 'self'}
                  disabled={disabled}
                  placeholder={placeholder}
                  view="date"
                  selectionMode="single"
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
                  onChange={(event) => {
                    this.setState({ value: (event.value as Date) }, () => {
                      if (onChange !== undefined) {
                        onChange(event);
                      }
                    });
                  }}
        />
        {
          addonAfter !== undefined ? (
            <div className="p-inputgroup-addon devs_calendar__addon_after">
              {addonAfter}
            </div>
          ) : ''
        }
        {
          suffixIcon !== undefined ? (
            <div className="p-inputgroup-addon devs_calendar__suffix_icon">
              <i className={suffixIcon} />
            </div>
          ) : ''
        }
      </div>
    );
  }
}
