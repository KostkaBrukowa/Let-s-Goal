/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, Dimensions, Animated,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputImage from '../InputImage';
import { NEW_GAME_CIRCLE_SIZE } from '../../const/const';
import AnimatedText from '../AnimatedText';
import { pickName } from '../../redux/actions/gameFormActions';

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
  };

  static propTypes = {
    value: PropTypes.string,
    errors: PropTypes.string,
    pickValue: PropTypes.func.isRequired,
    keyboardType: PropTypes.string,
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
      value, errors, pickValue, title, icon, keyboardType,
    } = this.props;
    const isSelected = value != null && errors == null;
    return (
      <View style={[styles.container]}>
        <Text>{title}</Text>
        <View style={styles.imageInputContainer}>
          <InputImage
            iconSize={50}
            icon={icon}
            onPress={this.toggleInput}
            isSelected={isSelected}
          />
          <AnimatedText
            keyboardType={keyboardType}
            isTextInputVisible={isTextInputVisible}
            onBlur={pickValue}
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
