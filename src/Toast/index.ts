import "./toast.less";

// let toastShowed = 0;

type Param =
  | string
  | {
      content: string;
      delay: number;
    };

export default {
  show: (param: Param) => {
    let content = typeof param === "string" ? param : param.content,
      delay = typeof param === "string" ? 3000 : param.delay;

    const div = document.createElement("div");
    div.innerHTML = content;
    div.className = "toast-container";
    document.body.appendChild(div);
    requestAnimationFrame(() => (div.style.opacity = "1"));

    setTimeout(() => {
      // div.style.top = "";
      div.style.opacity = "0";
      div.addEventListener("transitionend", () => {
        document.body.removeChild(div);
      });
    }, delay);
  }
};

// export default class Toast extends Component {
//   static show(param) {

//   render() {
//     return null;
//   }
// }

// Toast.defaultProps = {
//   onClick: () => {},
//   extStyles: {}
// };
