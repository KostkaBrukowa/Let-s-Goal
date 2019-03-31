import { createStackNavigator } from 'react-navigation';

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
    initialRouteName: 'welcome',
  },
);

export default LoginNavigator;
