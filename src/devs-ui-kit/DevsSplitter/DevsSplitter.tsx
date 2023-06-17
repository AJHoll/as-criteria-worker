import './DevsSplitter.scss';
import React, { ReactNode } from 'react';
import { Splitter, SplitterProps } from 'primereact/splitter';

interface DevsSplitterProps {
  children: ReactNode;
  layout?: SplitterProps['layout']
}

export default class DevsSplitter extends React.Component<DevsSplitterProps> {
  render() {
    const { children, layout } = this.props;
    return (
      <Splitter className="devs_splitter"
                layout={layout ?? 'horizontal'}
      >
        {children}
      </Splitter>
    );
  }
}
