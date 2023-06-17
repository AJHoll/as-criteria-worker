import React from 'react';
import './WindowTabBar.scss';
import { observer } from 'mobx-react';
import { StoreProps } from '../../../interfaces/StoreProps';
import WindowTab from '../WindowTab/WindowTab';
import WindowTabBarStore from '../../stores/WindowTabBarStore';

export interface WindowTabBarProps extends StoreProps {
}

export class WindowTabBar extends React.Component<WindowTabBarProps> {
  windowTabBarStore: WindowTabBarStore = this.props.rootStore.windowTabBarStore;

  componentDidMount(): void {
  }

  activate = (tabId: string, _event: React.MouseEvent<HTMLDivElement>) => {
    this.windowTabBarStore.activeTab(tabId);
  };

  close = (tabId: string, _event: React.MouseEvent<HTMLDivElement>) => {
    this.windowTabBarStore.closeTab(tabId);
  };

  render(): React.ReactNode {
    return (
      <>
        {this.windowTabBarStore.tabs.map((tabProps) => (
          <WindowTab id={tabProps.id}
                     key={tabProps.id}
                     title={tabProps.title}
                     icon={tabProps.icon}
                     active={tabProps.active}
                     onActivate={this.activate}
                     onClose={this.close}
          />
        ))}
      </>
    );
  }
}

const OWindowTabBar = observer(WindowTabBar);
export default OWindowTabBar;
