import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.less";

// interface Props   >

export interface GenericModalProps extends React.PropsWithChildren<{}> {
  show: boolean;
  dismiss: () => void;
  easing?: "none" | "bounce";
  className?: string;
  noDismissOnShade?: boolean;
  destroyOnDismiss?: boolean;
  closeBtn?: boolean;
}

const GenericModal = (prop: GenericModalProps) => {
  let { show, dismiss, easing, children, className, noDismissOnShade, closeBtn = true } = prop;
  if (!easing) easing = "none";
  const [render, set_render] = React.useState(false);
  const [mounted, set_mounted] = React.useState(false);
  React.useEffect(() => {
    if (!mounted && show) {
      set_mounted(true);
      setTimeout(() => set_render(true), 100);
    } else {
      set_render(show);
    }
  }, [show]);
  if (!mounted) return null;
  return ReactDOM.createPortal(
    <div className={`modal-wrapper ${render ? "show" : ""} easing-${easing}`} onClick={() => !noDismissOnShade && dismiss()}>
      <div onClick={e => e.stopPropagation()} className={className}>
        {closeBtn && (
          <svg viewBox="0 0 50 50" className="ub-modal-close-icon" onClick={dismiss}>
            <path fill="#E2E2E2" d="M 50 0l-50 0 a50 50 0 0 0 50 50 z"></path>
            <line x1="22" x2="37" y1="12" y2="27" strokeWidth="3" stroke="#666666" />
            <line x1="37" x2="22" y1="12" y2="27" strokeWidth="3" stroke="#666666" />
          </svg>
        )}

        {children}
      </div>
    </div>,
    document.body
  );
};

export default GenericModal;
