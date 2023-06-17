import './ManageRate.scss';
import React from 'react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import { observer } from 'mobx-react';

interface ManageRateProps extends StoreProps {
}

export class ManageRate extends React.Component<ManageRateProps> {
  render() {
    return (
      <div className="app_manage_rate">
        manage rate works!
      </div>
    );
  }
}

const OManageRate = observer(ManageRate);
export default OManageRate;
