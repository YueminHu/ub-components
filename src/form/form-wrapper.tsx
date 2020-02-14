import * as React from "react";
import { FormContext } from "./index";

interface Props {
  name: string;
  required?: boolean;
  label?: string;
  transform?: (d: string) => any;
}

export const FormWrapperContext = React.createContext<{
  value: string;
  set_form_value: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}>({
  value: "",
  set_form_value: null,
  name: ""
});

const FormWrapper = (prop: Props) => {
  const { name, required, transform } = prop;
  return Element => {
    const { set_values, values } = React.useContext(FormContext);
    React.useEffect(() => {
      set_values(old_value => ({
        ...old_value,
        [name]: {
          value: "",
          required: !!required,
          transform
        }
      }));
    }, []);
    const set_value = (value: string) => {
      set_values(old_value => {
        old_value[name].value = value;
        return {...old_value}
      });
    };
    return (
      <FormWrapperContext.Provider
        value={{
          set_form_value: set_value,
          name,
          value: values[name] && (values[name].value || "")
        }}
      >
        {prop.label && (
          <label htmlFor={name}>
            {prop.label}
            {required && "*"}
          </label>
        )}
        {Element}
      </FormWrapperContext.Provider>
    );
  };
};

export default FormWrapper;
