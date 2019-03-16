import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Button,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PURPLE_APP_TINT, ERROR_COLOR } from '../const/const';
import appStyle from '../const/globalStyles';
import BackgroundImage from '../components/BackgroundImage';
import CustomButton from '../components/CustomButton';
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
    register: PropTypes.func.isRequired,
    isBeingAuthenticated: PropTypes.bool.isRequired,
    registerErrors: PropTypes.object.isRequired,
  };

  state = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    usernameError: '',
    emailError: '',
    mainError: '',
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { registerErrors } = this.props;
    const { registerErrors: prevRegisterErrors } = prevProps;
    if (registerErrors !== prevRegisterErrors) {
      this.parseErrors();
    }
  };

  parseErrors = () => {
    const { registerErrors } = this.props;
    const newErrors = Object.keys(registerErrors).reduce((pValue, key) => {
      if (key !== 'non_field_errors') {
        return { ...pValue, [`${key}Error`]: registerErrors[key][0] };
      }
      return { ...pValue, mainError: registerErrors.non_field_errors[0] };
    }, {});
    this.setState(newErrors);
  };

  handleInputChange = (field, input) => {
    this.setState({
      [field]: input,
      [`${field}Error`]: '',
    });
  };

  registerUser = (credentials) => {
    const { password1, password2 } = credentials;
    if (password1 !== password2) {
      this.setState({ mainError: "Passwords didn't match" });
      return;
    }

    const { register } = this.props;
    register(credentials);
  };

  render() {
    const {
      username,
      email,
      password1,
      password2,
      usernameError,
      emailError,
      mainError,
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
            onChangeText={password1 => this.setState({ password1 })}
            value={password1}
            placeholder="Password"
            secureTextEntry
          />
          <FormTextInput
            onChangeText={password2 => this.setState({ password2 })}
            value={password2}
            placeholder="Repeat password"
            secureTextEntry
          />
          {!isBeingAuthenticated ? (
            <CustomButton
              style={styles.button}
              textStyle={styles.buttonTitle}
              onPress={() => this.registerUser({
                username,
                password1,
                password2,
                email,
              })
              }
              title="Log in"
              color={PURPLE_APP_TINT}
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
