import './DevsModal.scss';
import React, { CSSProperties } from 'react';
import { Dialog } from 'primereact/dialog';
import DevsBlockUI from '../DevsBlockUI/DevsBlockUI';

interface ModalProps {
  visible: boolean;
  appendTo?: string;
  title?: string | React.ReactElement;
  children?: React.ReactElement | React.ReactElement[];
  footer?: React.ReactElement;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

export default class DevsModal extends React.Component<ModalProps> {
  render() {
    const {
      visible, appendTo, title,
      children, footer,
      onClose, className, style,
    } = this.props;
    return (
      <DevsBlockUI visible={visible} appendTo={appendTo ?? 'body'}>
        <Dialog header={title}
                appendTo="self"
                footer={footer}
                style={style}
                className={`devs_modal ${className}`}
                draggable={false}
                modal={false}
                visible={visible}
                onHide={() => {
                  if (onClose !== undefined) {
                    onClose();
                  }
                }}
        >
          {children}
        </Dialog>
      </DevsBlockUI>
    );
  }
}
