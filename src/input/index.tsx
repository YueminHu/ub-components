import * as React from "react";

import "./index.less";

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  prefixElement?: React.ReactNode;
  affixElemet?: React.ReactNode;
}

const Input = (prop: Props) => {
  const { onFocus, onBlur, prefixElement, affixElemet, ...restProps } = prop;
  const [focus, set_focus] = React.useState(false);
  return (
    <span className={`ub-input-wrapper ${focus ? "focus" : ""}`}>
      {prefixElement}
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
      {affixElemet}
    </span>
  );
};

export default Input;
