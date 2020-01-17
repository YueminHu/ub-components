import * as React from "react";

import "./index.less";
interface Props {
  size?: React.ReactText;
  color?: string;
  stationary?: boolean;
}

// const color = ;

const LoadingLogo = (prop: Props) => {
  let { color = "rgb(73, 152, 252)", size, stationary } = prop;
  // if (!color) color = "rgb(73, 152, 252)";
  // const rings = ["M 175 30", "a 145 145 0 1 1 -145 145", "l 10 0", "a 135 135 0 1 0 135 -135"];
  return (
    <svg
      version="1.1"
      baseProfile="full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 350"
      className={`ub-logo-loading ${stationary ? "stationary" : ""}`}
      // fill={color}
      style={{
        height: size || ""
      }}
    >
      {stationary && <path d="M 175 0 l 175 79 l 0 192 l -175 79 l -179 -79 l 0 -192 z" fill={color}></path>}
      <path
        d="M 72 110 l 30 0 l 0 100 c 0 30, 50 30, 60 0 l 0 -100 l 30 0 l 0 115 c -5 50, -105 50, -120 0 Z"
        fill={stationary ? "#fff" : color}
      ></path>
      <path
        d="M 162 110 l 80 0 c 45 0, 45 70, 10 70 c 35 0, 35 83, -10 83 l -85 0 q 30 -8, 42 -28 l 35 0 c 20 0, 20 -35, 0 -35 l -70 0 l 0 -32 l 70 0 c 20 0, 20 -33, 0 -33 l -70 0 Z"
        fill={stationary ? "#fff" : color}
      ></path>
      {!stationary && <path d="M 175 0 a 175 175 0 1 1 -175 175 l 10 0 a 165 165 0 1 0 165 -165" fill={color}></path>}
    </svg>
  );
};

export default LoadingLogo;
