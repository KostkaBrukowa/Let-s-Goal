import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';

import appStyle from '../../const/appStyles';

function CustomButton(props) {
  const {
    style, textStyle, containerStyle, onPress, title, color,
  } = props;
  return (
    <View style={[containerStyle, appStyle.container]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[style, appStyle.container, { backgroundColor: color }]}>
          <Text style={textStyle}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

CustomButton.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

CustomButton.defaultProps = {
  style: {},
  textStyle: {},
  containerStyle: {},
};

export default CustomButton;
