import { createBottomTabNavigator } from 'react-navigation';

import JoinScreen from '../screens/JoinScreen';
import NewGameNavigator from './NewGameNavigator';
import EventsScreen from '../screens/EventsScreen';

export const AppNavigator = createBottomTabNavigator(
  {
    joinGame: JoinScreen,
    newGame: NewGameNavigator,
    events: EventsScreen,
  },
  { initialRouteName: 'newGame' },
);

export default AppNavigator;
