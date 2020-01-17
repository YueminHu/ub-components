import * as React from "react";

import "./index.less";

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  prefix?: React.ReactNode
}

const Input = (prop: Props) => {
  const { onFocus, onBlur, prefix, ...restProps } = prop;
  const [focus, set_focus] = React.useState(false);
  return (
    <span className={`ub-input-wrapper ${focus ? "focus" : ""}`}>
      {
        prefix
      }
      <input
        onFocus={e => {
          set_focus(true);
          onFocus && onFocus(e);
        }}
        onBlur={e => {
          set_focus(false);
          onBlur && onBlur(e);
        }}
      ></input>
    </span>
  );
};

export default Input;
