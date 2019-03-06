import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';

import { PURPLE_APP_TINT, FACEBOOK_COLOR } from '../const/const';
import appStyle from '../const/globalStyles';
import CustomButton from '../components/CustomButton';
import BackgroundImage from '../components/BackgroundImage';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 40,
    color: 'white',
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 5,
  },
  buttonConatiner: {
    margin: '3%',
  },
  buttonTitle: {
    fontSize: 17,
    color: 'white',
  },
  description: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
  },
});
class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {};

  render() {
    const { height } = Dimensions.get('screen');
    console.log(FACEBOOK_COLOR);

    return (
      <View style={{ marginTop: Constants.statusBarHeight }}>
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
            onPress={() => this.props.navigation.push('login')}
            // onPress={() => console.log('login')}
          />

          <CustomButton
            containerStyle={styles.buttonConatiner}
            textStyle={styles.buttonTitle}
            style={styles.button}
            disabled
            color={FACEBOOK_COLOR}
            title="Login with Facebook"
            onPress={() => this.props.navigation.push('register')}
          />
        </BackgroundImage>
      </View>
    );
  }
}

export default WelcomeScreen;
