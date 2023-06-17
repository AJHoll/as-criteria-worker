import './DevsTabPanel.scss';
import React, { ReactNode } from 'react';
import { TabPanel } from 'primereact/tabview';

export interface DevsTabPanelProps {
  children: ReactNode,
  header?: ReactNode,
  icon?: string,
  disabled?: boolean,
}

export default class DevsTabPanel extends React.Component<DevsTabPanelProps, any> {
  render() {
    const { children, header, icon, disabled } = this.props;
    return (
      <TabPanel className="devs_tab_panel"
                header={header}
                leftIcon={icon}
                disabled={disabled}
      >
        {children}
      </TabPanel>
    );
  }
}
