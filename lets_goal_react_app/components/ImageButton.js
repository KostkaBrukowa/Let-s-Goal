import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import { BOTTOM_ICON_SIZE } from '../const/const';

function ImageButton({
  onPress, iconName, size, color,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 10 }}>
      <Icon name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
}

ImageButton.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

ImageButton.defaultProps = {
  onPress: () => {},
  size: BOTTOM_ICON_SIZE,
  color: 'white',
};

export default ImageButton;
