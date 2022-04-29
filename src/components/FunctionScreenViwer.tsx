import React from 'react';

import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';


type FunctionScreenViwerProps = {
  expression: string
}
const FunctionScreenViwer = (props:FunctionScreenViwerProps) => {
  return (<MathJaxSvg fontSize={28} fontCache={true} color="white">
      {'$$'+props.expression+'$$'}
  </MathJaxSvg>);
};

export default FunctionScreenViwer;
