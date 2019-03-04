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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 23,
    color: 'white',
  },
  description: {
    fontSize: 17,
    color: 'grey',
    textAlign: 'center',
  },
  textLink: {
    fontSize: 17,
    textDecorationLine: 'underline',
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
});
class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {};

  state = {};

  render() {
    const { height } = Dimensions.get('screen');
    console.log(FACEBOOK_COLOR);

    return (
      <View style={{ marginTop: Constants.statusBarHeight }}>
        <ImageBackground
          style={[styles.container, { height: 1000 }]}
          imageStyle={[appStyle.backgroundAbsoluteStyle]}
          source={require('../assets/images/background-field-dim.png')}
        >
          <Text style={[styles.title]}>Hello</Text>
          <Text style={[styles.description, { marginBottom: 30 }]}>
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

          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Text style={styles.description}>Do not have an account?</Text>
            <TouchableWithoutFeedback style={{ marginLeft: 40 }}>
              <Text style={styles.textLink}> Create one now</Text>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default WelcomeScreen;
