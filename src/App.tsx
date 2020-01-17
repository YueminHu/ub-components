import * as React from "react";

import "./style.less";
import Button from "./button";
import Modals from "./modal";
import Toast from "./Toast";
import LoadingLogo from "./ub-logo";

interface Props {}

const App = (prop: Props) => {
  const [loading, toggle_loading] = React.useState(true);
  return (
    <>
      <section>
        <p>Button</p>
        <div>
          <Button onClick={() => toggle_loading(!loading)}>Toggle Disabled!</Button>
          <br></br>
          <Button loading={loading}>This is Loading Button!</Button>
        </div>
      </section>
      <Modals></Modals>
      <section>
        <p>Toast</p>
        <div>
          <Button onClick={() => Toast.show("Toast showing...")}>Show Toast!</Button>
        </div>
      </section>
      <section>
        <p>Logo</p>
        <div>
          <p>Logo loading</p>
          <LoadingLogo size={40}></LoadingLogo>
        </div>
        <div>
          <p>Logo</p>
          <LoadingLogo size={40} stationary></LoadingLogo>
        </div>
      </section>
    </>
  );
};

export default App;
