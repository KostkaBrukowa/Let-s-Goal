import React, { Component } from 'react';
import {
  Alert, ActivityIndicator, KeyboardAvoidingView, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PURPLE_APP_TINT } from '../const/const';
import appStyle from '../const/appStyles';
import BackgroundImage from '../components/common/BackgroundImage';
import CustomButton from '../components/common/CustomButton';
import { login } from '../redux/actions/authActions';
import FormTextInput from '../components/login/FormTextInput';
import DescriptionWithLink from '../components/login/DescriptionWithLink';

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 17,
    color: 'white',
  },
});

const initialState = {
  username: 'Alex',
  password: 'password',
  usernameError: '',
  passwordError: '',
};

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    loginErrors: PropTypes.object,
    isBeingAuthenticated: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  state = initialState;

  componentDidUpdate = (prevProps) => {
    // checking for end of authentication process
    const { isBeingAuthenticated } = this.props;
    const { isBeingAuthenticated: prevIsBeingAuthenticated } = prevProps;
    if (isBeingAuthenticated !== prevIsBeingAuthenticated && !isBeingAuthenticated) {
      const { loginErrors } = this.props;
      const { isAuthenticated } = this.props;
      if (loginErrors) {
        Alert.alert('Ups... Something went wrong', loginErrors.error, [{ text: 'Ok' }]);
      } else if (isAuthenticated) {
        const { navigation } = this.props;
        this.setState(initialState);
        navigation.navigate('mainApp');
      }
    }
  };

  logUserIn = (username, password) => {
    if (username === '' || password === '') {
      if (password === '') this.setState({ passwordError: 'Password cannot be blank' });
      if (username === '') this.setState({ usernameError: 'Login cannot be blank' });

      return;
    }

    this.props.login(username, password);
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
          {isBeingAuthenticated ? (
            <ActivityIndicator size={46} style={{ marginTop: 30 }} color="white" />
          ) : (
            <CustomButton
              style={appStyle.loginButtonStyle}
              textStyle={styles.buttonTitle}
              onPress={() => this.logUserIn(username, password)}
              title="Log in"
              color={PURPLE_APP_TINT}
            />
          )}

          <DescriptionWithLink
            description="Do not have an account?"
            linkTitle="Create one now"
            onLinkPress={() => navigation.navigate('register')}
          />
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
