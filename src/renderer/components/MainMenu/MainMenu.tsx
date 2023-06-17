import './MainMenu.scss';
import React from 'react';
import { StoreProps } from '../../../interfaces/StoreProps';
import { observer } from 'mobx-react';
import MainMenuStore from '../../stores/MainMenuStore';
import MainMenuItem from './MainMenuItem';
import icon from '../../../../assets/icon.svg';

export interface MainMenuProps extends StoreProps {
}

export class MainMenu extends React.Component<MainMenuProps> {
  mainMenuStore: MainMenuStore = this.props.rootStore.mainMenuStore;

  async componentDidMount(): Promise<void> {
    await this.mainMenuStore.reloadData();
  }

  render(): React.ReactNode {
    const { menu, selectMenuItem } = this.mainMenuStore;
    return (
      <div className="app_main_menu">
        <div className="app_main_menu__icon">
          <img src={icon} alt="logo" />
          <div className="app_main_menu__icon-text">
            <span>CritIN</span>
            <p>by devs.io</p>
          </div>
        </div>
        <div className="app_main_menu__content">
          {menu.map((item) => {
            const { id, icon, title } = item;
            return (
              <MainMenuItem key={id}
                            id={id}
                            title={title}
                            icon={icon}
                            selectMenuItem={(menuItemId) => {
                              selectMenuItem(menuItemId);
                            }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const OMainMenu = observer(MainMenu);
export default OMainMenu;
