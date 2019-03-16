import { createStackNavigator } from 'react-navigation';

import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';
import { PURPLE_APP_TINT } from '../const/const';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import JoinScreen from '../screens/JoinScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';

const EventsNavigator = createStackNavigator(
  {
    joinScreen: JoinScreen,
    detailsScreen: GameDetailsScreen,
    userDetails: UserDetailsScreen,
  },
  {
    initialRouteName: 'joinScreen',
    headerLayoutPreset: 'center',
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: PURPLE_APP_TINT,
      },

      title: 'Join Event',
    },
  },
);

EventsNavigator.navigationOptions = {
  tabBarIcon: BottomNavIcon('md-calendar'),
  tabBarLabel: 'Near Events',
};

export default EventsNavigator;
