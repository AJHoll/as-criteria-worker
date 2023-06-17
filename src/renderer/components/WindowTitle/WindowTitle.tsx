import React from 'react';
import './WindowTitle.scss';
import controlsUtil from '../../utils/ControlsUtil';
import ipcUtil from '../../utils/IpcUtil';

export type WindowTitleProps = {
  tabBar?: React.ReactElement;
};

export default class WindowTitle extends React.Component<WindowTitleProps, { maximizedClass: string }> {
  static windowControlClick(type: string) {
    switch (type) {
      case 'minimize': {
        controlsUtil.minimize();
        break;
      }
      case 'maximize': {
        controlsUtil.toggleMaximize();
        break;
      }
      case 'close': {
        controlsUtil.close();
        break;
      }
      default: {
        break;
      }
    }
  }

  static getMaximizedClass(isMaximized: boolean): string {
    return isMaximized
      ? 'window__control-unmaximize'
      : 'window__control-maximize';
  }

  static minimizeClickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    WindowTitle.windowControlClick('minimize');
  };

  static maximizeClickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    WindowTitle.windowControlClick('maximize');
  };

  static closeClickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    WindowTitle.windowControlClick('close');
  };

  constructor(props: WindowTitleProps) {
    super(props);
    this.state = {
      maximizedClass: '',
    };
  }

  componentDidMount() {
    this.setState({
      maximizedClass: WindowTitle.getMaximizedClass(controlsUtil.isMaximized()),
    });

    ipcUtil.on(
      'toggle-maximize',
      (isMaximized: boolean) => {
        this.setState({
          maximizedClass: WindowTitle.getMaximizedClass(isMaximized),
        });
      },
    );
  }

  render(): React.ReactNode {
    const { tabBar } = this.props;
    const { maximizedClass } = this.state;
    return (
      <>
        <div
          className="window__title-tab-bar"
          onDoubleClick={WindowTitle.maximizeClickHandler}
        >
          {tabBar}
        </div>
        <div className="window__controls">
          <div className="window__control window__control-minimize"
               onClick={WindowTitle.minimizeClickHandler}
          />
          <div className={['window__control', maximizedClass].join(' ')}
               onClick={WindowTitle.maximizeClickHandler}
          />
          <div className="window__control window__control-close"
               onClick={WindowTitle.closeClickHandler}
          />
        </div>
      </>
    );
  }
}
