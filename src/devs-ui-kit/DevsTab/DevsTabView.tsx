import './DevsTabView.scss';
import React, { ReactNode } from 'react';
import { TabPanel, TabView, TabViewTabChangeEvent } from 'primereact/tabview';
import { DevsTabPanelProps } from './DevsTabPanel';
import { v4 as uuid } from 'uuid';

export interface DevsTabViewProps {
  children: ReactNode | ReactNode[];
  activeIndex?: number;
  renderActiveOnly?: boolean;
  scrollable?: boolean;
  onBeforeTabChange?: (event: TabViewTabChangeEvent) => void;
  onTabChange?: (event: TabViewTabChangeEvent) => void;
}

export default class DevsTabView extends React.Component<DevsTabViewProps, any> {
  render() {
    const {
      children, activeIndex, renderActiveOnly,
      scrollable, onBeforeTabChange, onTabChange,
    } = this.props;
    return (
      <TabView className="devs_tab_view"
               activeIndex={activeIndex ?? 0}
               renderActiveOnly={renderActiveOnly}
               scrollable={scrollable}
               onBeforeTabChange={onBeforeTabChange}
               onTabChange={onTabChange}
      >
        {
          (children instanceof Array ? children : [children]).map((child) => {
            const { children, header, icon, disabled } = (child as any).props as DevsTabPanelProps;
            return (
              <TabPanel key={uuid()}
                        className="devs_tab_panel"
                        header={header}
                        disabled={disabled}
                        leftIcon={icon}
              >
                {children}
              </TabPanel>
            );
          })
        }
      </TabView>
    );
  }
}
