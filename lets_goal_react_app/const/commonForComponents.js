import { ToastAndroid } from 'react-native';

export function ConnectionErrorToast() {
  ToastAndroid.show('Could not connect to a sever', ToastAndroid.SHORT);
}
