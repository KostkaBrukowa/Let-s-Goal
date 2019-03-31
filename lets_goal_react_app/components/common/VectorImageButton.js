import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import { BOTTOM_ICON_SIZE } from '../../const/const';

function VectorImageButton({
  onPress, iconName, size, color,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={{ margin: 10 }}>
      <Icon name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
}

VectorImageButton.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

VectorImageButton.defaultProps = {
  onPress: null,
  size: BOTTOM_ICON_SIZE,
  color: 'white',
};

export default VectorImageButton;
