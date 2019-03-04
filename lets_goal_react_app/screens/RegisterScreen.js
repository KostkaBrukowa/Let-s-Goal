import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PURPLE_APP_TINT } from '../const/const';
import appStyle from '../const/globalStyles';
import BackgroundImageScroll from '../components/BackGroundImageScroll';
import CustomButton from '../components/CustomButton';

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'black',
    opacity: 0.3,
    width: 300,
    height: 55,
    fontSize: 20,
    borderRadius: 5,
    padding: 4,
  },

  button: {
    width: 300,
    height: 50,
    borderRadius: 5,
  },

  buttonTitle: {
    fontSize: 17,
    color: 'white',
  },
});

export class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    authenticate: PropTypes.func.isRequired,
  };

  state = {
    login: '',
    password: '',
    repeatedPassword: '',
  };

  render() {
    const { login, password, repeatedPassword } = this.state;
    const { height } = Dimensions.get('screen');
    return (
      <ImageBackground
        style={[appStyle.container, { height }]}
        imageStyle={[appStyle.backgroundAbsoluteStyle]}
        source={require('../assets/images/background-field.jpg')}
      >
        <View style={[{ height: 300 }, appStyle.container, { justifyContent: 'space-around' }]}>
          <Text style={appStyle.bigTitle}>Register</Text>
          <TextInput
            style={styles.input}
            onChange={login => this.setState({ login })}
            value={login}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChange={password => this.setState({ password })}
            value={password}
            placeholder="Password"
          />
          <TextInput
            style={styles.input}
            onChange={repeatedPassword => this.setState({ repeatedPassword })}
            value={repeatedPassword}
            placeholder="Repeat password"
          />
          <CustomButton
            style={styles.button}
            textStyle={styles.buttonTitle}
            onPress={() => console.log('logged')}
            title="Register"
            color={PURPLE_APP_TINT}
          />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
