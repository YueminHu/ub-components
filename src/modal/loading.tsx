import * as React from "react";

import "./index.less";
import GenericModal, { GenericModalProps } from "./generic";
import LoadingLogo from "../ub-logo";

interface Props extends GenericModalProps {}

const LoadingModal = (prop: Props) => {
  let { show, dismiss, easing, children } = prop;

  return (
    <GenericModal show={show} dismiss={dismiss} easing={easing} className="loading-modal" noDismissOnShade>
      <LoadingLogo></LoadingLogo>
    </GenericModal>
  );
};

export default LoadingModal;
