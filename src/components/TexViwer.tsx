import React from 'react';

import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';


type TexViwerProps = {
  expression: string,
}
const TexViwer = (props:TexViwerProps) => {
  return (<MathJaxSvg fontSize={40} fontCache={true}>
      {'$$'+props.expression+'$$'}
  </MathJaxSvg>);
};

export default TexViwer;
