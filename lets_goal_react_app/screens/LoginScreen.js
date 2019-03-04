import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
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
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 300,
    height: 55,
    fontSize: 20,
    borderRadius: 5,
    padding: 4,
    marginTop: 26,
  },

  button: {
    width: 300,
    height: 50,
    borderRadius: 5,
    marginTop: 26,
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
  };

  render() {
    const { login, password } = this.state;
    const { height } = Dimensions.get('screen');
    return (
      <ImageBackground
        style={[appStyle.container, { height }]}
        imageStyle={[appStyle.backgroundAbsoluteStyle]}
        source={require('../assets/images/background-field.jpg')}
      >
        <KeyboardAvoidingView style={[appStyle.container]} behavior="padding" enabled>
          <Text style={appStyle.bigTitle}>Log in</Text>
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
          <CustomButton
            style={styles.button}
            textStyle={styles.buttonTitle}
            onPress={() => console.log('logged')}
            title="Log in"
            color={PURPLE_APP_TINT}
          />
        </KeyboardAvoidingView>
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
