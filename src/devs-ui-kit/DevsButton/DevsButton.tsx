import './DevsButton.scss';
import React, { CSSProperties } from 'react';
import { Button } from 'primereact/button';

export interface ButtonProps {
  template: 'filled' | 'outlined';
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger';
  raised?: boolean;
  title?: string;
  icon?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
}

export default class DevsButton extends React.Component<ButtonProps> {
  render() {
    const {
      template, raised, color, style, className,
      onClick, icon, title, disabled, loading,
    } = this.props;
    return (
      <Button severity={color === 'primary' ? undefined : color}
              outlined={template === 'outlined'}
              raised={raised}
              className={`devs_button ${className}`}
              style={style}
              onClick={onClick}
              loadingIcon={<i className="p-button-icon p-c p-button-icon-left lni lni-spinner-solid devs_rotating" />}
              icon={icon}
              label={title}
              disabled={disabled}
              loading={loading}
      />
    );
  }
}
