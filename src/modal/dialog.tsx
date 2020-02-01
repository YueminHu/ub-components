import * as React from 'react';

import './index.less';
import GenericModal, { GenericModalProps } from './generic';
import Button, { BtnProps } from '../button';

interface Props extends GenericModalProps {
  onOk?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    c: GenericModalProps['dismiss']
  ) => void | Promise<any>;
  okText?: React.ReactNode;
  onCancel?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    c: GenericModalProps['dismiss']
  ) => void | Promise<any>;
  cancelText?: React.ReactNode;
  noCancenBtn?: boolean;
  okBtnProps?: BtnProps;
  cancelBtnProps?: BtnProps;
}

const DialogModal = (prop: Props) => {
  let {
    show,
    dismiss,
    easing,
    children,
    onOk,
    okText,
    onCancel,
    cancelText,
    noCancenBtn,
    okBtnProps,
    cancelBtnProps,
    ...rest
  } = prop;
  if (!onOk) onOk = () => dismiss();
  if (!onCancel) onCancel = () => dismiss();

  const [loading, set_loading] = React.useState(false);

  const processOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const res = onOk(e, dismiss);
    if (res && res.constructor === Promise) {
      set_loading(true);
      res
        .then(() => {
          set_loading(false);
          // dismiss();
        })
        .catch(e => {
          set_loading(false);
        });
    } else {
      dismiss();
    }
  };

  return (
    <GenericModal
      show={show}
      dismiss={dismiss}
      easing={easing}
      className='ub-dialog-container'
      {...rest}
    >
      {children}
      <div className='ub-dialog-footer'>
        {!noCancenBtn && (
          <Button onClick={e => onCancel(e, dismiss)} {...cancelBtnProps}>
            {cancelText || '取消'}
          </Button>
        )}
        <Button onClick={processOk} loading={loading} {...okBtnProps}>
          {okText || '确定'}
        </Button>
      </div>
    </GenericModal>
  );
};

export default DialogModal;
