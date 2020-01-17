import * as React from "react";

import "./style.less";
import Button from "../button";
import Modals from "./modal";
import Toast from "../toast";
import LoadingLogo from "../ub-logo";
import Input from "../input";
import Section from "./section";

interface Props {}

const App = (prop: Props) => {
  const [loading, toggle_loading] = React.useState(true);
  return (
    <>
      <Section title={"Button"}>
        <div>
          <Button onClick={() => toggle_loading(!loading)}>Toggle Disabled!</Button>
          <br></br>
          <Button loading={loading}>This is Loading Button!</Button>
        </div>
      </Section>
      <Modals></Modals>
      <Section title="Toast">
        <section>
          <div>
            <Button onClick={() => Toast.show("Toast showing...")}>Show Toast!</Button>
          </div>
        </section>
      </Section>
      <Section title="Logo">
        <div>
          <p>Logo loading</p>
          <LoadingLogo size={40}></LoadingLogo>
        </div>
        <div>
          <p>Logo</p>
          <LoadingLogo size={40} stationary></LoadingLogo>
        </div>
      </Section>
      <Section title="Inputs">
        <div>
          <p>Input: Text</p>
          <Input></Input>
        </div>
      </Section>
    </>
  );
};

export default App;
