import { createStackNavigator } from 'react-navigation';

import EventsScreen from '../screens/EventsScreen';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';
import { PURPLE_APP_TINT } from '../const/const';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';

const EventsNavigator = createStackNavigator(
  {
    eventsScreen: EventsScreen,
    detailsScreen: GameDetailsScreen,
    userDetails: UserDetailsScreen,
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
