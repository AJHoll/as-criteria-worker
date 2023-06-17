import React from 'react';
import './MainPage.scss';
import { StoreProps } from '../../../interfaces/StoreProps';
import OMainMenu from '../MainMenu/MainMenu';
import { observer } from 'mobx-react';

export interface MainPageProps extends StoreProps {
}

export class MainPage extends React.Component<MainPageProps> {
  render(): React.ReactNode {
    return <OMainMenu rootStore={this.props.rootStore} />;
  }
}

const OMainPage = observer(MainPage);
export default OMainPage;
