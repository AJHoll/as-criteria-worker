import './DevsSelect.scss';
import React from 'react';
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from 'primereact/autocomplete';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  name?: string;
  options?: SelectOption[] | any[];
  value?: SelectOption | string | number;
  disabled?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange?: (event: AutoCompleteChangeEvent) => void;
  completeMethod?: (event: AutoCompleteCompleteEvent) => void;
  field?: string;
  invalid?: boolean;
  forceSelection?: boolean;
  onlySelection?: boolean;
  prefixIcon?: string;
  addonBefore?: React.ReactElement;
  suffixIcon?: string;
  addonAfter?: React.ReactElement;
}

export interface SelectState {
  cFocused: boolean;
  cOptions: SelectOption[] | any[];
  cValue?: SelectOption | string | number;
}

export default class DevsSelect extends React.Component<SelectProps, SelectState> {
  constructor(props: SelectProps) {
    super(props);
    this.state = {
      cFocused: false,
      cOptions: [...(props.options ?? [])],
      cValue: props.value ?? undefined,
    };
  }

  render() {
    const {
      name, disabled, invalid, forceSelection, onlySelection, field, options,
      onChange, completeMethod, onFocus, onBlur,
      prefixIcon, addonBefore, suffixIcon, addonAfter,
    } = this.props;
    const { cOptions, cValue, cFocused } = this.state;
    return (
      <div
        className={`p-inputgroup devs_select
        ${cFocused ? 'devs_select__focused' : ''}
        ${disabled ? 'devs_select__disabled' : ''}
        ${invalid ? 'p-invalid devs_select__invalid' : ''}
        ${(prefixIcon !== undefined || addonBefore !== undefined) ? 'devs_select__prefix' : ''}
        ${(suffixIcon !== undefined || addonAfter !== undefined) ? 'devs_select__suffix' : ''}
        `}
      >
        {
          prefixIcon !== undefined ? (
            <span className="p-inputgroup-addon devs_select__prefix_icon">
              <i className={prefixIcon} />
            </span>
          ) : ''
        }
        {
          addonBefore !== undefined ? (
            <span className="p-inputgroup-addon devs_select__addon_before">
              {addonBefore}
            </span>
          ) : ''
        }
        <AutoComplete className={`${invalid ? 'p-invalid' : ''}`}
                      dropdown
                      forceSelection={forceSelection ?? true}
                      readOnly={onlySelection}
                      name={name}
                      onFocus={(event) => {
                        this.setState({ cFocused: true }, () => {
                          if (onFocus !== undefined) {
                            onFocus(event);
                          }
                        });
                      }}
                      onBlur={(event) => {
                        this.setState({ cFocused: false }, () => {
                          if (onBlur !== undefined) {
                            onBlur(event);
                          }
                        });
                      }}
                      field={field ?? 'label'}
                      disabled={disabled}
                      suggestions={cOptions}
                      completeMethod={(event) => {
                        this.setState({
                          cOptions: (options ?? [])
                            .filter((option) => (option[(field ?? 'label')] as unknown as string).toLowerCase()
                              .indexOf(event.query.toLowerCase()) !== -1),
                        }, () => {
                          if (completeMethod !== undefined) {
                            completeMethod(event);
                          }
                        });
                      }}
                      value={cValue}
                      onChange={(event) => {
                        this.setState({ cValue: event.value }, () => {
                          if (onChange !== undefined) {
                            onChange(event);
                          }
                        });
                      }}
        />
        {
          addonAfter !== undefined ? (
            <span className="p-inputgroup-addon devs_select__addon_after">
              {addonAfter}
            </span>
          ) : ''
        }
        {
          suffixIcon !== undefined ? (
            <span className="p-inputgroup-addon devs_select__suffix_icon">
              <i className={suffixIcon} />
            </span>
          ) : ''
        }
      </div>
    );
  }
}
