import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MapScreen from '../screens/MapScreen';
import NewGameScreen from '../screens/NewGameScreen';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';
import { PURPLE_APP_TINT } from '../const/const';

const NewGameNavigator = createStackNavigator(
  {
    map: MapScreen,
    newGame: NewGameScreen,
  },
  {
    initialRouteName: 'newGame',
    headerLayoutPreset: 'center',
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: PURPLE_APP_TINT,
      },

      title: 'Create game',
    },
  },
);

NewGameNavigator.navigationOptions = {
  tabBarIcon: BottomNavIcon('md-add'),
  tabBarLabel: 'Create',
};

export default NewGameNavigator;
