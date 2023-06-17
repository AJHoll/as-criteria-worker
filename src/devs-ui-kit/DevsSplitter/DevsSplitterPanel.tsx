import './DevsSplitterPanel.scss';
import React from 'react';
import { SplitterPanel, SplitterPanelProps } from 'primereact/splitter';

interface DevsSplitterPanelProps {
  children: SplitterPanelProps['children'];
  minSize?: SplitterPanelProps['minSize'];
  size?: SplitterPanelProps['size'];
}

export default class DevsSplitterPanel extends React.Component<DevsSplitterPanelProps> {
  render() {
    const { children, minSize, size } = this.props;
    return (
      <SplitterPanel className="devs_splitter_panel"
                     size={size}
                     minSize={minSize}
      >
        {children}
      </SplitterPanel>
    );
  }
}
