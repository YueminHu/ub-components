import * as React from "react";
import "./index.less";

interface Props {
  progress: number; // 比例, 介于0到1之间
  delay?: number; // ms
  offset?: string; // px, 当距离底部距离为多少时开始滚动. 必须为‘xpx’ 或者 ‘x%'
}

const Progress = (props: Props) => {
  const { progress = 1, delay = 0, offset = '0px' } = props;
  const [animateStarted, setAnimateStarted] = React.useState(false);
  const wrapperWElem = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    if (!window["IntersectionObserver"]) {
      setAnimateStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([target]) => {
        if (target.isIntersecting) {
          setTimeout(() => setAnimateStarted(true), delay);

          observer.unobserve(target.target);
        }
      },
      {
        rootMargin: `0px 0px ${offset} 0px`,
        threshold: 1
      }
    );
    observer.observe(wrapperWElem.current);
  }, []);
  return (
    <div className={"ub-progress-wrapper"} ref={wrapperWElem}>
      <span
        style={{
          width: `${animateStarted ? progress * 100 : 0}%`
        }}
      />
    </div>
  );
};

export default Progress;
