import React from 'react';

import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';


type ScreenViwerProps = {
  expression: string
}
const ScreenViwer = (props:ScreenViwerProps) => {
  return (<MathJaxSvg fontSize={36} fontCache={true} color="white">
      {'$$'+props.expression+'$$'}
  </MathJaxSvg>);
};

export default ScreenViwer;
