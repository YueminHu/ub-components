import * as React from 'react';

import './index.less';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  prefixElement?: React.ReactNode;
  affixElemet?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
}

const Input = (prop: Props) => {
  const {
    onFocus,
    onBlur,
    prefixElement,
    affixElemet,
    wrapperStyle,
    ...restProps
  } = prop;
  const [focus, set_focus] = React.useState(false);
  return (
    <span
      className={`ub-input-wrapper ${focus ? 'focus' : ''}`}
      style={wrapperStyle}
    >
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
        {...restProps}
      ></input>
      {affixElemet}
    </span>
  );
};

export default Input;
