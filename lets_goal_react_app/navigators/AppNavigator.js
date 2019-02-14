import { createBottomTabNavigator } from 'react-navigation';

import JoinScreen from '../screens/JoinScreen';
import NewGameScreen from '../screens/NewGameScreen';
import EventsScreen from '../screens/EventsScreen';

export const AppNavigator = createBottomTabNavigator(
  {
    joinGame: JoinScreen,
    newGame: NewGameScreen,
    events: EventsScreen,
  },
  { initialRouteName: 'events' },
);

export default AppNavigator;
