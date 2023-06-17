import React from 'react';
import './WindowLayout.scss';

export type WindowLayoutProps = {
  title?: React.ReactElement;
  content?: React.ReactElement;
  footer?: React.ReactElement;
};

export default class WindowLayout extends React.Component<WindowLayoutProps> {
  componentDidMount() {
    const spinner = document.querySelector('#loading-spinner');
    if (spinner) spinner.remove();
  }

  render(): React.ReactNode {
    const { title, content, footer } = this.props;
    return (
      <div id="window">
        <div id="window__title">{title}</div>
        <div id="window__content">{content}</div>
        {footer ? (
          <div id="window__footer">{footer}</div>
        ) : undefined}
      </div>
    );
  }
}
