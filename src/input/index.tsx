import * as React from "react";

import "./index.less";

import { FormWrapperContext } from "../form/form-wrapper";

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  prefixElement?: React.ReactNode;
  affixElemet?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
}

const Input = (prop: Props) => {
  const { onFocus, onBlur, prefixElement, affixElemet, wrapperStyle, onChange, value, id, ...restProps } = prop;
  const [focus, set_focus] = React.useState(false);

  const { set_form_value, name, value: form_value } = React.useContext(FormWrapperContext);
  // console.log(form_value, name);
  return (
    <span className={`ub-input-wrapper ${focus ? "focus" : ""}`} style={wrapperStyle}>
      {prefixElement}
      <input
        value={form_value || value || ""}
        onFocus={e => {
          set_focus(true);
          onFocus && onFocus(e);
        }}
        onBlur={e => {
          set_focus(false);
          onBlur && onBlur(e);
        }}
        onChange={e => {
          set_form_value && set_form_value(e.target.value);
          onChange && onChange(e);
        }}
        id={name || id}
        {...restProps}
      ></input>
      {affixElemet}
    </span>
  );
};

interface TextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  wrapperStyle?: React.CSSProperties;
}

Input.TextArea = (prop: TextAreaProps) => {
  const { onFocus, onBlur, wrapperStyle, onChange, value, id, ...restProps } = prop;
  const [focus, set_focus] = React.useState(false);
  const { set_form_value, name, value: form_value } = React.useContext(FormWrapperContext);

  return (
    <span className={`ub-input-wrapper ${focus ? "focus" : ""}`} style={wrapperStyle}>
      <textarea
        value={form_value || value || ""}
        onFocus={e => {
          set_focus(true);
          onFocus && onFocus(e);
        }}
        onBlur={e => {
          set_focus(false);
          onBlur && onBlur(e);
        }}
        onChange={e => {
          set_form_value && set_form_value(e.target.value);
          onChange && onChange(e);
        }}
        id={name || id}
        {...restProps}
      ></textarea>
    </span>
  );
};

export default Input;
