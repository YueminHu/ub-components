import * as React from 'react';
import * as ReactDom from 'react-dom';

import './index.less';
import GenericModal, { GenericModalProps } from './generic';
import Button, { BtnProps } from '../button';

interface DialogModalProps extends GenericModalProps {
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

const DialogModal = (prop: DialogModalProps) => {
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

DialogModal.confirm = (options: DialogModalProps) => {
  let { show, dismiss, ...rest } = options;
  let internal_show = true;
  const internal_dismiss = () => {
    internal_show = false;
    render();
    setTimeout(() => {
      document.body.removeChild(container);
    }, 2000);
  };
  const container = document.createElement('div');
  const render = () =>
    ReactDom.render(
      <DialogModal
        {...rest}
        show={internal_show}
        dismiss={internal_dismiss}
        mountElement={container}
      ></DialogModal>,
      container
    );
  document.body.appendChild(container);
  render();
};

export default DialogModal;
