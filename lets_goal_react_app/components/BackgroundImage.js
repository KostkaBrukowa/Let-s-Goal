import React from 'react';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';

import appStyle from '../const/globalStyles';

export default function BackgroundImage(props) {
  const { children, dim } = props;
  const { height } = Dimensions.get('screen');
  //   const image = dim
  //     ? '../assets/images/background-field-dim.png'
  //     : '../assets/images/background-field.jpgj';
  return (
    <ImageBackground
      style={[appStyle.container, { height }]}
      imageStyle={[appStyle.backgroundAbsoluteStyle]}
      source={require('../assets/images/background-field.jpg')}
    >
      {children}
    </ImageBackground>
  );
}
