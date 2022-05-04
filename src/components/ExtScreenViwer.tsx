import React from 'react';

import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';


type ExtScreenViwerProps = {
  expression: string,
  fontSize?:number,
}
const ExtScreenViwer = (props:ExtScreenViwerProps) => {
  if (!props.fontSize) {props.fontSize=28}
  return (<MathJaxSvg fontSize={props.fontSize} fontCache={true} color="white">
      {'$$'+props.expression+'$$'}
  </MathJaxSvg>);
};

export default ExtScreenViwer;
