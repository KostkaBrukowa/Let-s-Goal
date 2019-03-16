import React, { Component } from 'react';
import {
  Alert,
  TouchableOpacity,
  ActivityIndicator,
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
import BackgroundImage from '../components/BackgroundImage';
import CustomButton from '../components/CustomButton';
import { login } from '../redux/actions/authActions';
import FormTextInput from '../components/login/FormTextInput';

const styles = StyleSheet.create({
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
  description: {
    fontSize: 17,
    color: 'lightgrey',
    textAlign: 'center',
  },
  textLink: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'white',
  },
});

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    loginErrors: PropTypes.object.isRequired,
    isBeingAuthenticated: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
  };

  componentDidUpdate = (prevProps) => {
    // checking for end of authentication process
    const { isBeingAuthenticated } = this.props;
    const { isBeingAuthenticated: prevIsBeingAuthenticated } = prevProps;
    if (isBeingAuthenticated !== prevIsBeingAuthenticated && !isBeingAuthenticated) {
      const { loginErrors } = this.props;
      const { isAuthenticated } = this.props;
      if (loginErrors) {
        this.makeAlert('Ups... Something went wrong', loginErrors.error);
      } else if (isAuthenticated) {
        const { navigation } = this.props;
        navigation.navigate('mainApp');
      }
    }

    // checking if authentication was successful
    // const { isAuthenticated: prevIsAuthenticated } = prevProps;
    // if (isAuthenticated) {
    //   const { navigation } = this.props;
    //   navigation.navigate('mainApp');
    // }
  };

  logUserIn = (username, password) => {
    // if (username === '' || password === '') {
    //   if (password === '') this.setState({ passwordError: 'Password cannot be blank' });
    //   if (username === '') this.setState({ usernameError: 'Login cannot be blank' });

    //   return;
    // }

    const { login } = this.props;
    login(username, password);
  };

  makeAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'Ok' }]);
  };

  render() {
    const {
      username, password, usernameError, passwordError,
    } = this.state;
    const { navigation, isBeingAuthenticated } = this.props;

    return (
      <BackgroundImage>
        <KeyboardAvoidingView style={[appStyle.container]} behavior="padding" enabled>
          <Text style={appStyle.bigTitle}>Log in</Text>
          <FormTextInput
            onChangeText={username => this.setState({ username, usernameError: '' })}
            value={username}
            placeholder="Username"
            error={usernameError}
          />
          <FormTextInput
            onChangeText={password => this.setState({ password, passwordError: '' })}
            value={password}
            placeholder="Password"
            error={passwordError}
            secureTextEntry
          />
          {!isBeingAuthenticated ? (
            <CustomButton
              style={styles.button}
              textStyle={styles.buttonTitle}
              onPress={() => this.logUserIn(username, password)}
              title="Log in"
              color={PURPLE_APP_TINT}
            />
          ) : (
            <ActivityIndicator size={46} style={{ marginTop: 30 }} color={PURPLE_APP_TINT} />
          )}

          <View style={[{ margin: 20 }, appStyle.container]}>
            <Text style={styles.description}>Do not have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('register')}>
              <Text style={styles.textLink}>Create one now</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </BackgroundImage>
    );
  }
}

const mapStateToProps = state => ({
  loginErrors: state.user.loginErrors,
  isBeingAuthenticated: state.user.isBeingAuthenticated,
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
