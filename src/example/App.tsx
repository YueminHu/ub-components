import * as React from "react";

import "../css-variables.less";
import "./style.less";
import Button from "../button";
import Modals from "./modal";
import Toast from "../toast";
import UBLogo from "../ub-logo";
import Input from "../input";
import Section from "./section";
import Progress from "../progress";
import ImageLazy from "../image-lazy";

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
      <Section title="Logo">
        <div>
          <p>Loading Logo</p>
          <UBLogo size={40}></UBLogo>
        </div>
        <div>
          <p>Stationary Logo</p>
          <UBLogo size={40} stationary></UBLogo>
        </div>
      </Section>
      <Section title="Inputs">
        <div>
          <p>Input: Text</p>
          <Input prefixElement={<span>Code:</span>} affixElemet={<span>Password</span>}></Input>
        </div>
      </Section>
      <Section title="Notifications">
        <div>
          <p>Toast</p>
          <Button onClick={() => Toast.show("Toast showing...")}>Show Toast!</Button>
        </div>
        <div>
          <p>Banner</p>
          <Button>Click to show notification</Button>
        </div>
      </Section>
      <Section title="Display">
        <div>
          <p>Progress</p>
          <Progress progress={0.8}></Progress>
        </div>
        <div>
          <p>Lazy Load Image</p>
          <ImageLazy src={'https://placekitten.com/100/100'}></ImageLazy>
        </div>
      </Section>
    </>
  );
};

export default App;
