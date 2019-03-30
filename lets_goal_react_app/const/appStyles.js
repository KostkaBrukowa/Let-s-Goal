import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigTitle: {
    fontSize: 23,
    color: 'white',
  },
  smallTitle: {
    fontSize: 17,
    color: 'white',
  },

  backgroundAbsoluteStyle: {
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -10,
  },
  loginButtonStyle: {
    width: 300,
    height: 50,
    borderRadius: 5,
    marginTop: 26,
  },
});
