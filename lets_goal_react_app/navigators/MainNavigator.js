import React from 'react';

import { createSwitchNavigator } from 'react-navigation';

import { LoginNavigator } from './LoginNavigator';
import { AppNavigator } from './AppNavigator';

const MainNavigator = createSwitchNavigator(
  {
    mainApp: AppNavigator,
    loginScreen: LoginNavigator,
  },
  {
    initialRouteName: 'loginScreen',
  },
);

export default MainNavigator;
