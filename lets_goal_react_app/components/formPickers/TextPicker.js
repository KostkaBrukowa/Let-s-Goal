/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import InputImage from '../InputImage';
import AnimatedText from '../AnimatedText';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 17,
  },
});

export default class NumberPicker extends Component {
  static defaultProps = {
    keyboardType: 'default',
    title: '',
    width: 0.75,
    onFocus: () => {},
  };

  static propTypes = {
    value: PropTypes.string,
    errors: PropTypes.string,
    pickValue: PropTypes.func.isRequired,
    keyboardType: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string.isRequired,
    width: PropTypes.number,
    onFocus: PropTypes.func,
  };

  state = {
    isTextInputVisible: false,
  };

  componentDidUpdate = (prevProps) => {
    const { value, errors } = this.props;
    if (prevProps.value !== value && value && !errors) {
      this.setState({ isTextInputVisible: false });
    }

    // const { isTextInputVisible } = this.state;
    // const { isTextInputVisible: prevIsTextInputVisible } = prevProps;
    // if (isTextInputVisible !== prevIsTextInputVisible && isTextInputVisible) {
    //   this.props.onFocus();
    // }
  };

  toggleInput = () => {
    const { isTextInputVisible } = this.state;

    this.setState({ isTextInputVisible: !isTextInputVisible });
  };

  render() {
    const { isTextInputVisible } = this.state;
    const {
      value, errors, pickValue, title, icon, keyboardType, width, onFocus,
    } = this.props;
    const isSelected = value != null && errors == null;
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
            keyboardType={keyboardType}
            isTextInputVisible={isTextInputVisible}
            onBlur={pickValue}
            onFocus={onFocus}
            widthPart={width}
          />
        </View>
      </View>
    );
  }
}
