import './DevsToast.scss';
import React from 'react';
import { Toast, ToastMessage } from 'primereact/toast';
import { CSSTransitionProps } from 'primereact/csstransition';

export interface ToastProps {
  baseZIndex?: number | undefined;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right' | undefined;
  transitionOptions?: CSSTransitionProps | undefined;
  appendTo?: 'self' | HTMLElement | null | undefined;
  children?: React.ReactNode | undefined;
  onClick?: (message: ToastMessage) => void;
  onRemove?: (message: ToastMessage) => void;
  onShow?: () => void;
  onHide?: () => void;
}

export default class DevsToast extends React.Component<ToastProps> {
  toastRef: React.RefObject<Toast> = React.createRef();

  toastLife = 3000;

  // eslint-disable-next-line react/no-unused-class-component-methods
  info(title: string, content?: string): void {
    this.toastRef.current?.show({
      severity: 'info',
      summary: title,
      detail: content,
      life: this.toastLife,
      icon: 'lni lni-information',
    });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  success(title: string, content?: string): void {
    this.toastRef.current?.show({
      severity: 'success',
      summary: title,
      detail: content,
      life: this.toastLife,
      icon: 'lni lni-checkmark',
    });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  warning(title: string, content?: string): void {
    this.toastRef.current?.show({
      severity: 'warn',
      summary: title,
      detail: content,
      life: this.toastLife,
      icon: 'lni lni-warning',
    });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  error(title: string, content?: string): void {
    this.toastRef.current?.show({
      severity: 'error',
      summary: title,
      detail: content,
      life: this.toastLife,
      icon: 'lni lni-alarm',
    });
  }

  render() {
    const {
      baseZIndex, position, transitionOptions, appendTo,
      children, onClick, onRemove, onShow, onHide,
    } = this.props;
    return (
      <Toast ref={this.toastRef}
             className="devs_toast"
             baseZIndex={baseZIndex}
             position={position ?? 'top-right'}
             transitionOptions={transitionOptions}
             appendTo={appendTo}
             onClick={onClick}
             onRemove={onRemove}
             onShow={onShow}
             onHide={onHide}
      >
        {children}
      </Toast>
    );
  }
}
