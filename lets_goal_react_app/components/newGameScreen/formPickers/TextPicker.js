/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import InputImage from '../InputImage';
import AnimatedText from '../AnimatedText';
import appStyles from '../../../const/appStyles';
import { ERROR_COLOR } from '../../../const/const';

const styles = StyleSheet.create({
  container: {
    ...appStyles.container,
    width: '100%',
  },
  imageInputContainer: appStyles.container,
  error: {
    color: ERROR_COLOR,
    textAlign: 'center',
    fontSize: 17,
  },
});

export default class NumberPicker extends Component {
  static defaultProps = {
    keyboardType: 'default',
    title: '',
    screenWidth: 0.75,
    onFocus: null,
  };

  static propTypes = {
    submitedValue: PropTypes.string,
    errors: PropTypes.string,
    pickValue: PropTypes.func.isRequired,
    keyboardType: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string.isRequired,
    screenWidth: PropTypes.number,
    onFocus: PropTypes.func,
  };

  state = {
    isTextInputVisible: false,
    value: '',
  };

  componentDidUpdate = (prevProps) => {
    const { submitedValue, errors } = this.props;
    const { submitedValue: prevSubmitedValue } = prevProps;

    if (submitedValue !== prevSubmitedValue) {
      // value was correct
      if (submitedValue && !errors) {
        this.setState({ isTextInputVisible: false });
      } else if (submitedValue == null && prevSubmitedValue !== null) {
        // whole form was correct
        this.setState({ isTextInputVisible: false, value: '' });
      }
    }
  };

  toggleInput = () => {
    const { isTextInputVisible } = this.state;

    this.setState({ isTextInputVisible: !isTextInputVisible });
  };

  render() {
    const { value } = this.state;
    const {
      submitedValue, errors, pickValue, title, icon,
    } = this.props;
    const isSelected = submitedValue != null && errors == null;
    return (
      <View style={[styles.container]}>
        <View style={styles.imageInputContainer}>
          <InputImage
            title={title}
            iconSize={50}
            icon={icon}
            onPress={this.toggleInput}
            isSelected={isSelected}
            isInvalid={errors != null}
          />
          {errors && <Text style={styles.error}>{errors}</Text>}
          <AnimatedText
            {...this.props}
            {...this.state}
            onChangeText={value => this.setState({ value })}
            onBlur={() => pickValue(value)}
          />
        </View>
      </View>
    );
  }
}
