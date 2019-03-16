import React from 'react';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-navigation';

import appStyle from '../const/globalStyles';

export default function BackgroundImage(props) {
  const { children, dim } = props;
  const { height } = Dimensions.get('screen');
  const image = dim
    ? require('../assets/images/background-field_night.jpg')
    : require('../assets/images/background-field.jpg');
  return (
    <ImageBackground
      style={[appStyle.container, { height, marginTop: -Header.HEIGHT }]}
      imageStyle={[appStyle.backgroundAbsoluteStyle]}
      source={image}
    >
      {children}
    </ImageBackground>
  );
}
