import * as React from "react";

import "./index.less";
import LoadingLogo from "components/ub-components/src/ub-logo";

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
}

const Button = (prop: Props) => {
  const { loading, children, className, disabled, ...restProps } = prop;
  return (
    <button {...restProps} className={`ub-button ${loading? 'loading' : ''} ${className || ""}`} disabled={loading || disabled}>
      <LoadingLogo color={"gray"}></LoadingLogo>
      {children}
    </button>
  );
};

export default Button;
