import * as React from "react";

import "./index.less";

import { FormWrapperContext } from "../form/form-wrapper";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  prefixElement?: React.ReactNode;
  affixElemet?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
}

const Input = (prop: InputProps) => {
  const { onFocus, onBlur, prefixElement, affixElemet, wrapperStyle, onChange, value, id, ...restProps } = prop;
  const [focus, set_focus] = React.useState(false);

  const { set_form_value, name, value: form_value } = React.useContext(FormWrapperContext);
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

Input.Select = (prop: InputProps & { select_list: string[]; onAdd?: (items: string[]) => void }) => {
  const { onFocus, onBlur, prefixElement, affixElemet, wrapperStyle, onChange, id, select_list, onAdd, ...restProps } = prop;

  const [value, set_value] = React.useState("");
  const [focus, set_focus] = React.useState(false);

  const { set_form_value, name, value: form_value } = React.useContext(FormWrapperContext);

  const [selecting_list_idx, set_selecting_list_idx] = React.useState(-1);

  const add_item = (i: string) => {
    Array.isArray(form_value) && set_form_value([...form_value, i]);
    set_value("");
  };

  const remove_item = (item: string) => {
    if (Array.isArray(form_value)) {
      form_value.splice(form_value.indexOf(item), 1);
      set_form_value([...form_value]);
    }
  };

  const filtered_pending_list = select_list.filter(i => i.toLowerCase().includes(String(value).toLowerCase()) && !form_value.includes(i));
  const pending_list_show = filtered_pending_list.length && focus;
  const selected_idx = selecting_list_idx % filtered_pending_list.length;

  return (
    <span className={`ub-input-wrapper ${focus ? "focus" : ""}`} style={wrapperStyle}>
      {prefixElement}
      {Array.isArray(form_value) &&
        form_value.map(item => (
          <span key={item} className="ub-select-item">
            {item}
            {/* <span onClick={() => remove_item(item)}>X</span> */}
          </span>
        ))}
      <input
        value={value}
        onFocus={e => {
          set_focus(true);
          // handle_pending_list(value);
          onFocus && onFocus(e);
        }}
        onBlur={e => {
          setTimeout(() => {
            set_focus(false);
          }, 300);
          set_selecting_list_idx(-1);
          onBlur && onBlur(e);
        }}
        onKeyDown={e => {
          // console.log(pending_list, selected_idx);
          if (e.keyCode === 40) {
            set_selecting_list_idx(i => i + 1);
          } else if (e.keyCode === 38) {
            set_selecting_list_idx(i => i - 1);
          } else if (e.keyCode === 13) {
            add_item(filtered_pending_list[selected_idx]);
          } else if (e.keyCode === 8 && !value && form_value.length) {
            remove_item(form_value[form_value.length - 1]);
          }
        }}
        onChange={e => {
          const value = e.target.value;
          // handle_pending_list(value);
          set_value(value);
        }}
        id={name || id}
        {...restProps}
      ></input>
      {affixElemet}
      {pending_list_show ? (
        <span className="ub-select-list" onClick={e => e.stopPropagation()}>
          {filtered_pending_list.map((i, idx) => (
            <span key={i} className={idx === selected_idx ? "selected" : ""} onClick={() => add_item(i)}>
              {i}
            </span>
          ))}
        </span>
      ) : null}
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
