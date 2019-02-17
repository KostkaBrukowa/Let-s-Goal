import React from 'react';
import Icon from 'react-native-vector-icons/Foundation';
import PropTypes from 'prop-types';

const InputPicture = ({ icon, size }) => <Icon name={icon} size={size} color="#152730" />;

InputPicture.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default InputPicture;
