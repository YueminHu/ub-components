import * as React from "react";
import { FormContext } from "./index";

interface Props {
  name: string;
  required?: boolean;
  label?: string;
  transform?: (d: any) => any;
  init_value?: any;
}

export const FormWrapperContext = React.createContext<{
  value: any;
  set_form_value: React.Dispatch<React.SetStateAction<any>>;
  name: string;
}>({
  value: "",
  set_form_value: null,
  name: ""
});

const FormWrapper = (prop: Props) => {
  const { name, required, transform = d => d, init_value } = prop;
  return Element => {
    const { set_values, values, remove_field } = React.useContext(FormContext);
    // if (!values[name]) {
    //   set_values(old_value => ({
    //     ...old_value,
    //     [name]: {
    //       value: init_value || "",
    //       required: !!required,
    //       transform
    //     }
    //   }));
    // }
    React.useEffect(() => {
      set_values(old_value => ({
        ...old_value,
        [name]: {
          value: init_value === undefined ? "" : init_value,
          required: !!required,
          transform
        }
      }));
      return () => {
        console.log("remove!");
        remove_field(name);
      };
    }, []);
    const set_form_value = (value: any) => {
      set_values(old_value => {
        old_value[name] = {
          value,
          required,
          transform
        };
        // console.log(old_value);
        return { ...old_value };
      });
    };
    return (
      <FormWrapperContext.Provider
        value={{
          set_form_value,
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
