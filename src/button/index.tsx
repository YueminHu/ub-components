import * as React from "react";

import "./index.less";
import UBLogo from "../ub-logo";

export interface BtnProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
}

const Button = (prop: BtnProps) => {
  const { loading, children, className, disabled, ...restProps } = prop;
  return (
    <button {...restProps} className={`ub-button ${loading ? "loading" : ""} ${className || ""}`} disabled={loading || disabled}>
      <UBLogo color={"gray"}></UBLogo>
      {children}
    </button>
  );
};

export default Button;
