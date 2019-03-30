import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { PURPLE_APP_TINT, FACEBOOK_COLOR } from '../const/const';
import appStyle from '../const/appStyles';
import CustomButton from '../components/common/CustomButton';
import BackgroundImage from '../components/common/BackgroundImage';

const styles = StyleSheet.create({
  container: {
    ...appStyle.container,
    width: '100%',
  },
  title: {
    fontSize: 40,
    color: 'white',
  },
  button: {
    ...appStyle.loginButtonStyle,
    marginTop: 0,
  },
  buttonConatiner: {
    margin: '3%',
  },
  buttonTitle: {
    ...appStyle.smallTitle,
  },
  description: {
    ...appStyle.smallTitle,
    textAlign: 'center',
  },
});
function WelcomeScreen({ navigation }) {
  return (
    <BackgroundImage>
      <Text style={[styles.title]}>Hello</Text>
      <Text style={[styles.description, { marginBottom: 30, marginLeft: 47, marginRight: 47 }]}>
        If you want to play football today you are in a right place
      </Text>

      <CustomButton
        containerStyle={styles.buttonConatiner}
        textStyle={styles.buttonTitle}
        style={styles.button}
        color={PURPLE_APP_TINT}
        title="Login"
        onPress={() => navigation.navigate('login')}
      />

      <CustomButton
        containerStyle={styles.buttonConatiner}
        textStyle={styles.buttonTitle}
        style={styles.button}
        disabled
        color={FACEBOOK_COLOR}
        title="Login with Facebook"
        onPress={() => navigation.push('register')}
      />
    </BackgroundImage>
  );
}

WelcomeScreen.navigationOptions = {
  header: null,
};

WelcomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default WelcomeScreen;
