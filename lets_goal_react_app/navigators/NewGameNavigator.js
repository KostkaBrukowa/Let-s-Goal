import { createStackNavigator } from 'react-navigation';

import MapScreen from '../screens/MapScreen';
import NewGameScreen from '../screens/NewGameScreen';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';

const NewGameNavigator = createStackNavigator(
  {
    map: MapScreen,
    newGame: NewGameScreen,
  },
  { initialRouteName: 'newGame' },
);

NewGameNavigator.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: BottomNavIcon('md-add'),
  title: 'Create game',
};

export default NewGameNavigator;
