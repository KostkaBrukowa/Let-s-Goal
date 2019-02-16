import React from 'react';
import Icon from 'react-native-vector-icons/Foundation';
import PropTypes from 'prop-types';
import { NEW_GAME_ICON_SIZE } from '../../../const/const';

const InputPicture = ({ icon }) => <Icon name={icon} size={NEW_GAME_ICON_SIZE} color="#152730" />;

InputPicture.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default InputPicture;
