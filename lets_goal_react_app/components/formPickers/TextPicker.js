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
});

export default class NumberPicker extends Component {
  static defaultProps = {
    keyboardType: 'default',
    title: '',
    width: 0.75,
  };

  static propTypes = {
    value: PropTypes.string,
    errors: PropTypes.string,
    pickValue: PropTypes.func.isRequired,
    keyboardType: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string.isRequired,
    width: PropTypes.number,
  };

  state = {
    isTextInputVisible: false,
  };

  componentDidUpdate = (prevProps) => {
    const { value, errors } = this.props;
    if (prevProps.value !== value && value && !errors) {
      this.setState({ isTextInputVisible: false });
    }
  };

  toggleInput = () => {
    const { isTextInputVisible } = this.state;

    this.setState({ isTextInputVisible: !isTextInputVisible });
  };

  render() {
    const { isTextInputVisible } = this.state;
    const {
      value, errors, pickValue, title, icon, keyboardType, width,
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
          />
          <AnimatedText
            keyboardType={keyboardType}
            isTextInputVisible={isTextInputVisible}
            onBlur={pickValue}
            widthPart={width}
          />
        </View>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   name: state.gameForm.name.value,
//   errors: state.gameForm.name.errors,
// });

// export default connect(
//   mapStateToProps,
//   { pickName },
// )(NamePicker);
