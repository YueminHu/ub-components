import * as React from "react";

interface Props extends React.PropsWithChildren<{}> {
  title: React.ReactNode;
}

let idx = 0;

const Section = (prop: Props) => {
  const { current: instanceIdx } = React.useRef(String(idx++));
  const [collapse, set_collapse] = React.useState(sessionStorage.getItem(instanceIdx) ? true : false);
  React.useEffect(() => {
    collapse ? sessionStorage.setItem(instanceIdx, "1") : sessionStorage.removeItem(instanceIdx);
  }, [collapse]);
  return (
    <section
      style={{
        maxHeight: collapse ? "2em" : "20em"
      }}
    >
      <p onClick={() => set_collapse(!collapse)}>{prop.title}</p>
      {prop.children}
    </section>
  );
};

export default Section;
