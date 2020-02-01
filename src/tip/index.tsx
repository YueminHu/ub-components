import * as React from 'react';

import './index.less';

interface Props {
  trigger?: 'click' | 'hover';
  children: React.ReactNode;
}

let z_index = 1000;

const Tip = (prop: Props) => {
  const { trigger = 'click' } = prop;
  const [showed, setShowed] = React.useState(false);
  const [z, set_z] = React.useState(z_index--);

  let props: Partial<React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >> = {};
  if (trigger === 'click') {
    props = {
      onClick: () => setShowed(true),
      onBlur: () => setShowed(false),
      tabIndex: -1
    };
  } else {
    props = {
      onMouseOver: () => setShowed(true),
      onMouseLeave: () => setShowed(false)
    };
  }
  return (
    <span
      className='site-tip-wrapper'
      {...props}
      style={{
        zIndex: z
      }}
    >
      ?{showed ? <span>{prop.children}</span> : null}
    </span>
  );
};

Tip.defaultProps = {
  trigger: 'click'
};

export default Tip;
