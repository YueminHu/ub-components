import * as React from "react";

import "./index.less";
import GenericModal, { GenericModalProps } from "./generic";
import UBLogo from "../ub-logo";

interface Props extends GenericModalProps {}

const LoadingModal = (prop: Props) => {
  let { show, dismiss, easing, children } = prop;

  return (
    <GenericModal show={show} dismiss={dismiss} easing={easing} className="loading-modal" noDismissOnShade>
      <UBLogo></UBLogo>
    </GenericModal>
  );
};

export default LoadingModal;
