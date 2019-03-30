import React from 'react';
import { ImageBackground, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { Header } from 'react-navigation';

import appStyle from '../../const/appStyles';

function BackgroundImage(props) {
  const { children, dim, stackHeader } = props;
  const { height } = Dimensions.get('screen');
  const image = dim
    ? require('../../assets/images/background-field_night.jpg')
    : require('../../assets/images/background-field.jpg');
  return (
    <ImageBackground
      style={[appStyle.container, { height, marginTop: stackHeader ? -Header.HEIGHT : 0 }]}
      imageStyle={[appStyle.backgroundAbsoluteStyle]}
      source={image}
    >
      {children}
    </ImageBackground>
  );
}

BackgroundImage.propTypes = {
  dim: PropTypes.bool,
  stackHeader: PropTypes.bool,
};
BackgroundImage.defaultProps = {
  dim: false,
  stackHeader: false,
};

export default BackgroundImage;
