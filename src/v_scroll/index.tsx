import * as React from "react";

import "./index.less";
interface Props {
  datas: string[];
  interval?: number;
}

const VScroll = (prop: Props) => {
  const { datas, interval = 5000 } = prop;
  const [current, set_current] = React.useState(0);

  const wrapper = React.useRef<HTMLDivElement>();

  const scroll = () => {
    wrapper.current.classList.add("scrolled");
    setTimeout(() => {
      set_current(c => c + 1);
      wrapper.current.classList.remove("scrolled");
    }, 500);
  };

  React.useEffect(() => {
    setInterval(scroll, interval);
  }, []);
  return (
    <div className={`ub-vscroll-wrapper`} ref={wrapper}>
      <p>{datas[current % datas.length]}</p>
      <p>{datas[(current + 1) % datas.length]}</p>
    </div>
  );
};

export default VScroll;
