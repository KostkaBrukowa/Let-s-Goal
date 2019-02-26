import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MapScreen from '../screens/MapScreen';
import EventsScreen from '../screens/EventsScreen';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';
import { PURPLE_APP_TINT } from '../const/const';

const EventsNavigator = createStackNavigator(
  {
    eventsScreen: EventsScreen,
  },
  {
    initialRouteName: 'eventsScreen',
    headerLayoutPreset: 'center',
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: PURPLE_APP_TINT,
      },

      title: 'Your events',
    },
  },
);

EventsNavigator.navigationOptions = {
  tabBarIcon: BottomNavIcon('md-calendar'),
  tabBarLabel: 'Your events',
};

export default EventsNavigator;
