import * as React from "react";

interface Props extends React.PropsWithChildren<{}> {
  title: React.ReactNode;
}

const Section = (prop: Props) => {
  const [collapse, set_collapse] = React.useState(false);
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
