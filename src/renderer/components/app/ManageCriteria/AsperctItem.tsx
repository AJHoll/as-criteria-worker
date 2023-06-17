import './AspectItem.scss';
import React from 'react';
import { observer } from 'mobx-react';
import { StoreProps } from '../../../../interfaces/StoreProps';
import { AspectItemData } from '../../../stores/ManageCriteriaStore';
import DevsPanel from '../../../../devs-ui-kit/DevsPanel/DevsPanel';

export interface AsperctItemProps extends StoreProps {
  aspect: AspectItemData;
}

export class AsperctItem extends React.Component<AsperctItemProps> {
  get aspectNode(): React.ReactElement | React.ReactElement[] {
    switch (this.props.aspect.type) {
      case 'B': {
        return <p>boolean</p>;
      }
      case 'D': {
        return <p>discrette</p>;
      }
      case 'J': {
        return <p>judge</p>;
      }
      default: {
        return [];
      }
    }
  }

  render() {
    return (
      <DevsPanel className="app_aspect_item">
        {this.aspectNode}
      </DevsPanel>
    );
  }
}

const OAsperctItem = observer(AsperctItem);
export default OAsperctItem;
