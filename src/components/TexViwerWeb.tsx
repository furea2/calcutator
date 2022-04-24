import React from 'react';

import '../../assets/katex/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

type TexViwerProps = {
  expression: string
}
const TexViwerWeb = (props:TexViwerProps) => {  
  return(<InlineMath math={props.expression}/>)
};

export default TexViwerWeb;
