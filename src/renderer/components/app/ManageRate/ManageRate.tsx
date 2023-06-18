import './ManageRate.scss';
import React from 'react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import { observer } from 'mobx-react';
import ManageRateStore from '../../../stores/ManageRateStore';

interface ManageRateProps extends StoreProps {
}

export class ManageRate extends React.Component<ManageRateProps> {
  manageRateStore: ManageRateStore = this.props.rootStore.manageRateStore;

  render() {
    return (
      <div className="app_manage_rate">
        {JSON.stringify(this.manageRateStore.rates)}
      </div>
    );
  }
}

const OManageRate = observer(ManageRate);
export default OManageRate;
