import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

export const LoginNavigator = createStackNavigator(
  {
    welcome: WelcomeScreen,
    login: LoginScreen,
    register: RegisterScreen,
  },
  {
    initialRouteName: 'login',
  },
);

export default LoginNavigator;
