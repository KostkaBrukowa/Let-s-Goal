import React from 'react';
import Icon from 'react-native-vector-icons/Foundation';
import PropTypes from 'prop-types';

import { ERROR_COLOR } from '../../../const/const';

const UnselectedInputIcon = ({ icon, size, isInvalid }) => {
  const color = isInvalid ? ERROR_COLOR : '#152730';
  return <Icon name={icon} size={size} color={color} />;
};

UnselectedInputIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  isInvalid: PropTypes.bool.isRequired,
};

export default UnselectedInputIcon;
