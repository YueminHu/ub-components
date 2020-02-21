import * as React from "react";

import "./index.less";

import { FormWrapperContext } from "../form/form-wrapper";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  prefixElement?: React.ReactNode;
  affixElemet?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  tag?: "input" | "textarea";
}

const Input = (prop: InputProps) => {
  const { onFocus, onBlur, prefixElement, affixElemet, wrapperStyle, onChange, value, id, tag, ...restProps } = prop;
  const [focus, set_focus] = React.useState(false);

  const { set_form_value, name, value: form_value } = React.useContext(FormWrapperContext);

  const props = {
    value: form_value || value || "",
    onFocus: e => {
      set_focus(true);
      onFocus && onFocus(e);
    },
    onBlur: e => {
      set_focus(false);
      onBlur && onBlur(e);
    },
    onChange: e => {
      set_form_value && set_form_value(e.target.value);
      onChange && onChange(e);
    },
    id: name || id,
    ...restProps
  };
  return (
    <span className={`ub-input-wrapper ${focus ? "focus" : ""}`} style={wrapperStyle}>
      {prefixElement}
      <input {...props}></input>

      {affixElemet}
    </span>
  );
};

interface InputSelectProps<T = any> extends InputProps {
  select_list: T[];
  onAdd?: (items: T[]) => void;
  mapping: (arg0: T) => string;
  limit?: number;
}

Input.Select = (prop: InputSelectProps) => {
  const {
    onFocus,
    onBlur,
    prefixElement,
    affixElemet,
    wrapperStyle,
    onChange,
    id,
    select_list,
    onAdd,
    mapping,
    limit,
    ...restProps
  } = prop;

  const input_ref = React.useRef<HTMLInputElement>();

  const [value, set_value] = React.useState("");
  const [focus, set_focus] = React.useState(false);

  const { set_form_value, name, value: form_value } = React.useContext(FormWrapperContext);

  const [selecting_list_idx, set_selecting_list_idx] = React.useState(-1);

  if (!Array.isArray(form_value)) return null;

  const add_item = (i: any) => {
    if (Array.isArray(form_value)) {
      const added = [...form_value, i];
      set_form_value(added);
      onAdd && onAdd(added);
      set_value("");
    }
  };

  const remove_item = (item: any) => {
    if (Array.isArray(form_value)) {
      form_value.splice(form_value.indexOf(item), 1);
      set_form_value([...form_value]);
    }
  };

  const filtered_pending_list = select_list.filter(i => {
    const str = mapping(i);
    return str.toLowerCase().includes(String(value).toLowerCase()) && !(form_value as any[]).map(mapping).includes(str);
  });

  const pending_list_show = filtered_pending_list.length && focus && (limit ? form_value.length < limit : true);
  const selected_idx = selecting_list_idx % filtered_pending_list.length;

  return (
    <span className={`ub-input-wrapper ${focus ? "focus" : ""}`} style={wrapperStyle}>
      {prefixElement}
      {Array.isArray(form_value) &&
        form_value.map(item => (
          <span key={mapping(item)} className="ub-select-item">
            {mapping(item)}
            {/* <span onClick={() => remove_item(item)}>X</span> */}
          </span>
        ))}
      <input
        ref={input_ref}
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
            <span
              key={mapping(i) + idx}
              className={idx === selected_idx ? "selected" : ""}
              onClick={() => {
                add_item(i);
                // input_ref.current.focus();
              }}
            >
              {mapping(i)}
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
