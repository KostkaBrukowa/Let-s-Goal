import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { BOTTOM_ICON_SIZE, BOTTOM_ICON_COLOR_F, BOTTOM_ICON_COLOR_UF } from '../../../const/const';

const BottomNavIcon = iconName => ({ focused }) => (
  <Icon
    name={iconName}
    size={BOTTOM_ICON_SIZE}
    color={focused ? BOTTOM_ICON_COLOR_F : BOTTOM_ICON_COLOR_UF}
  />
);

export default BottomNavIcon;
