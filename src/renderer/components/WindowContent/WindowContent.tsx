import { observer } from 'mobx-react';
import React, { ReactNode } from 'react';
import { StoreProps } from '../../../interfaces/StoreProps';
import RootStore from '../../stores/RootStore';
import OMainPage from '../MainPage/MainPage';
import './WindowContent.scss';
import DevsToast from '../../../devs-ui-kit/DevsToast/DevsToast';
import OManageCriteria from '../app/ManageCriteria/ManageCriteria';
import OManageRate from '../app/ManageRate/ManageRate';

export interface WindowContentProps extends StoreProps {
}

export class WindowContent extends React.Component<WindowContentProps, any> {
  toastRef: React.RefObject<DevsToast> = React.createRef<DevsToast>();

  componentDidMount() {
    this.props.rootStore.toastRef = this.toastRef;
  }

  get component(): ReactNode {
    switch ((this.props.rootStore as RootStore).activeComponentName) {
      case 'mainPage': {
        return <OMainPage rootStore={this.props.rootStore} />;
      }
      case 'manageCriteria': {
        return <OManageCriteria rootStore={this.props.rootStore} />;
      }
      case 'manageRate': {
        return <OManageRate rootStore={this.props.rootStore} />;
      }
      default: {
        return <OMainPage rootStore={this.props.rootStore} />;
      }
    }
  }

  render(): ReactNode {
    return (
      <>
        {this.component}
        <DevsToast ref={this.toastRef} appendTo="self" />
      </>
    );
  }
}

const OWindowContent = observer(WindowContent);
export default OWindowContent;
