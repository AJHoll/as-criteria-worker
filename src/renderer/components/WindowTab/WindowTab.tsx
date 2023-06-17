import React from 'react';
import './WindowTab.scss';
import appIcon from '../../../../assets/icon.svg';

export type WindowTabProps = {
  id: string;
  icon?: string;
  title?: string;
  active?: boolean;
  onActivate?: (tabId: string, event: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: (tabId: string, event: React.MouseEvent<HTMLDivElement>) => void;
};

export default class WindowTab extends React.Component<WindowTabProps, any> {

  onActivateClickHandle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.props?.onActivate !== undefined) {
      this.props.onActivate(this.props.id, event);
    }
  };

  onCloseClickHandle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.props?.onClose !== undefined) {
      this.props.onClose(this.props.id, event);
    }
  };

  render(): React.ReactNode {
    const { id, active, title, icon } = this.props;
    const windowTabClassName = [
      'window-tab',
      active ? 'active' : '',
      id === 'main-menu' ? 'window-first-tab' : '',
    ];

    return (
      <div className={windowTabClassName.join(' ')}>
        <div className="window-tab__activate_wrapper"
             onClick={this.onActivateClickHandle}
        >
          <div className="window-tab__icon">
            <div className="window-tab__icon-icon">
              {id === 'main-menu' ? <img src={appIcon} alt="title" />
                : <i className={!icon ? 'lni lni-bookmark' : `lni ${icon}`} />}
            </div>
          </div>
          <div className="window-tab__title">{title}</div>
        </div>

        {id !== 'main-menu' ? (
          <div className="window-tab__close"
               onClick={this.onCloseClickHandle}
          />
        ) : null}
      </div>
    );
  }
}
