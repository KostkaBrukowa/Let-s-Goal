import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export const LoginNavigator = createStackNavigator({
  login: LoginScreen,
  register: RegisterScreen,
});

export default LoginNavigator;
