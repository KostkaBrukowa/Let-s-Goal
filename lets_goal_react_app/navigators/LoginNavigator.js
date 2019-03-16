import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

export const LoginNavigator = createSwitchNavigator(
  {
    welcome: WelcomeScreen,
    login: LoginScreen,
    register: RegisterScreen,
  },
  {
    initialRouteName: 'register',
  },
);

export default LoginNavigator;
