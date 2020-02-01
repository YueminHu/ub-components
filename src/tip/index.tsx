import * as React from "react";

import "./index.less";

interface Props {
  trigger?: "click" | "hover";
  children: React.ReactNode;
}

const Tip = (prop: Props) => {
  const [showed, setShowed] = React.useState(false);
  React.useEffect(() => {
    console.log(showed);
  }, [showed]);
  return (
    <span className="site-tip-wrapper" onClick={() => setShowed(true)} onBlur={() => setShowed(false)} tabIndex={-1}>
      ?{showed ? <span>{prop.children}</span> : null}
    </span>
  );
};

Tip.defaultProps = {
  trigger: "click"
};

export default Tip;