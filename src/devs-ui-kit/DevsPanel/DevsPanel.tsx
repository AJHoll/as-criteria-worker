import './DevsPanel.scss';
import React from 'react';

export interface PanelProps {
  children?: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default class DevsPanel extends React.Component<PanelProps> {
  render() {
    const { children, style, className, onClick } = this.props;
    return (
      <div className={`devs_panel ${className !== undefined ? className : ''}`}
           style={style}
           onClick={onClick}
      >
        {children}
      </div>
    );
  }
}
