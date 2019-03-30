import React, { Component } from 'react';
import {
  Text, ActivityIndicator, StyleSheet, KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PURPLE_APP_TINT, ERROR_COLOR } from '../const/const';
import appStyle from '../const/appStyles';
import BackgroundImage from '../components/common/BackgroundImage';
import CustomButton from '../components/common/CustomButton';
import FormTextInput from '../components/login/FormTextInput';
import { register } from '../redux/actions/authActions';
import DescriptionWithLink from '../components/login/DescriptionWithLink';

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
    register: PropTypes.func.isRequired,
    isBeingAuthenticated: PropTypes.bool.isRequired,
    registerErrors: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  state = {
    username: '',
    email: '',
    password: '',
    usernameError: '',
    emailError: '',
    mainError: '',
  };

  componentDidUpdate = (prevProps) => {
    const { registerErrors } = this.props;
    const { registerErrors: prevRegisterErrors } = prevProps;
    if (registerErrors !== prevRegisterErrors) {
      this.parseErrors();
    }
  };

  parseErrors = () => {
    const { registerErrors } = this.props;
    const newErrors = Object.keys(registerErrors).reduce((allErrors, key) => {
      if (key !== 'non_field_errors') {
        return { ...allErrors, [`${key}Error`]: registerErrors[key][0] };
      }
      return { ...allErrors, mainError: registerErrors.non_field_errors[0] };
    }, {});
    this.setState(newErrors);
  };

  handleInputChange = (field, input) => {
    this.setState({
      [field]: input,
      [`${field}Error`]: '',
    });
  };

  registerUser = () => {
    const { register } = this.props;
    const { username, password, email } = this.state;
    register({
      username,
      password1: password,
      password2: password,
      email,
    });
  };

  render() {
    const {
      username, email, password, usernameError, emailError, mainError,
    } = this.state;
    const { isBeingAuthenticated, navigation } = this.props;
    return (
      <BackgroundImage>
        <KeyboardAvoidingView style={[appStyle.container]} behavior="padding" enabled>
          <Text style={appStyle.bigTitle}>Register</Text>
          {mainError !== '' && (
            <Text style={[appStyle.bigTitle, { color: ERROR_COLOR }]}>{mainError}</Text>
          )}
          <FormTextInput
            onChangeText={username => this.handleInputChange('username', username)}
            value={username}
            placeholder="username"
            error={usernameError}
          />
          <FormTextInput
            onChangeText={email => this.handleInputChange('email', email)}
            value={email}
            placeholder="email"
            error={emailError}
            keyboardType="email-address"
          />
          <FormTextInput
            onChangeText={password => this.setState({ password })}
            value={password}
            placeholder="Password"
            secureTextEntry
          />
          {!isBeingAuthenticated ? (
            <CustomButton
              style={appStyle.loginButtonStyle}
              textStyle={styles.buttonTitle}
              onPress={() => this.registerUser()}
              title="Sign up"
              color="white"
            />
          ) : (
            <ActivityIndicator size={46} color={PURPLE_APP_TINT} />
          )}
          <DescriptionWithLink
            description="Have an account?"
            linkTitle="Go log in"
            onLinkPress={() => navigation.navigate('login')}
          />
        </KeyboardAvoidingView>
      </BackgroundImage>
    );
  }
}

const mapStateToProps = state => ({
  isBeingAuthenticated: state.user.isBeingAuthenticated,
  registerErrors: state.user.registerErrors,
});

const mapDispatchToProps = {
  register,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
