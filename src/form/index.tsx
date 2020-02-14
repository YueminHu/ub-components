import * as React from "react";

type Values = {
  [key: string]: {
    value: string | string[];
    required: boolean;
    transform?: (d: string | string[]) => any;
  };
};

export const FormContext = React.createContext<{
  values: Values;
  set_values: React.Dispatch<React.SetStateAction<Values>>;
}>({
  values: {},
  set_values: () => void 0
});

// interface Props {}

export interface FormProps {
  get_form_values: () => any;
  validate_form: () => string[] | null;
  fill_form_values: (new_values?: { [key: string]: any }) => void;
}

const Form = (Element: (prop) => JSX.Element) => {
  return props => {
    const [values, set_values] = React.useState<Values>({});
    const get_values = () =>
      Object.entries(values)
        // .map(([key, value]) => [key, value.value])
        .reduce((prev, next) => {
          const next_key = next[0];
          const next_val = next[1];
          prev[next_key] = next_val.transform ? next_val.transform(next_val.value) : next_val.value;
          return prev;
        }, {});
    const validate_form = () => {
      const res = Object.entries(values)
        .filter(([key, value]) => value.required && !value.value)
        .map(([key, value]) => key);
      return res.length ? res : null;
    };

    const fill_form_values = (new_values: { [key: string]: string }) => {
      if (new_values) {
        set_values(old_values => {
          Object.keys(new_values).forEach(k => old_values[k] && (old_values[k].value = new_values[k]));
          return { ...old_values };
        });
      } else {
        /** clear the form */
        set_values(old_values => {
          Object.keys(old_values).forEach(k => {
            old_values[k].value = Array.isArray(old_values[k].value) ? [] : "";
          });
          return { ...old_values };
        });
      }
    };

    return (
      <FormContext.Provider
        value={{
          values,
          set_values
        }}
      >
        <Element {...props} get_form_values={get_values} validate_form={validate_form} fill_form_values={fill_form_values}></Element>
      </FormContext.Provider>
    );
  };
};

export default Form;
