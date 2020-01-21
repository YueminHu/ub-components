import * as React from "react";

interface ImageLazyProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

import "./index.less";
// import UBLogo from "../ub-logo";
import { classNames } from "../utils";

const ImageLazy = (prop: ImageLazyProps) => {
  const { className = "", ...restProps } = prop;
  const [loaded, set_loaded] = React.useState(false);
  const ref = React.useCallback((node: HTMLImageElement) => {
    if (!node) return;
    if (node.complete) return set_loaded(true);
    node.addEventListener("load", () => set_loaded(true));
  }, []);
  return (
    <img
      className={classNames({
        ["ub-image-lazy"]: true,
        [`${className}`]: true,
        ["loaded"]: loaded
      })}
      {...restProps}
      ref={ref}
    ></img>
  );
};

export default ImageLazy;
