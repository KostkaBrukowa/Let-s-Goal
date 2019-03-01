import { createBottomTabNavigator } from 'react-navigation';

import JoinNavigator from './JoinNavigator';
import NewGameNavigator from './NewGameNavigator';
import MyEventsNavigator from './MyEventsNavigator';
import { BOTTOM_ICON_COLOR_UF, PURPLE_APP_TINT } from '../const/const';

export const AppNavigator = createBottomTabNavigator(
  {
    joinGame: JoinNavigator,
    newGame: NewGameNavigator,
    events: MyEventsNavigator,
  },
  {
    initialRouteName: 'joinGame',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: BOTTOM_ICON_COLOR_UF,
      activeBackgroundColor: PURPLE_APP_TINT,
      inactiveBackgroundColor: PURPLE_APP_TINT,
    },
  },
);

export default AppNavigator;
