import * as React from "react";
import { FormWrapperContext } from "../form/form-wrapper";

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const Checkbox = (prop: Props) => {
  const { value: form_value, set_form_value, name } = React.useContext(FormWrapperContext);
  const { value, onChange, ...rest } = prop;
  const use_value = form_value || value || false;
  return (
    <input
      id={name || undefined}
      type="checkbox"
      {...rest}
      checked={use_value}
      onChange={e => {
        set_form_value && set_form_value(e.target.checked);
        onChange && onChange(e);
      }}
    ></input>
  );
};

export default Checkbox;
