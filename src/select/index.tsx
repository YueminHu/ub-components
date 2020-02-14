import * as React from "react";
import { FormWrapperContext } from "../form/form-wrapper";

import "./index.less";

interface Props {
  children: React.ReactNode;
}

const Select = (prop: React.PropsWithChildren<Props>) => {
  const { value, set_form_value, name } = React.useContext(FormWrapperContext);
  const ref = React.useRef<HTMLSelectElement>();
  React.useEffect(() => {
    if (!value) set_form_value(ref.current.value);
  }, []);
  return (
    <select onChange={e => set_form_value(e.target.value)} value={value} id={name} className="ub-select-wrapper" ref={ref}>
      {prop.children}
    </select>
  );
};

export default Select;
