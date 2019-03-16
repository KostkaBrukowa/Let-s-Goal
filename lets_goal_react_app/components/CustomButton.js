import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, View, Text, StyleSheet,
} from 'react-native';

import appStyle from '../const/globalStyles';

const styles = StyleSheet.create({
  defaultButtonStyle: {},
});
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
  style: StyleSheet.create({}),
  textStyle: StyleSheet.create({}),
};

export default CustomButton;
