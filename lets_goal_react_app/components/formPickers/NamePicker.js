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

class NamePicker extends Component {
  static propTypes = {
    name: PropTypes.string,
    errors: PropTypes.string,
    pickName: PropTypes.func.isRequired,
  };

  state = {
    isTextInputVisible: false,
  };

  componentDidUpdate = (prevProps) => {
    const { name, errors } = this.props;
    if (prevProps.name != name && !errors) {
      this.setState({ isTextInputVisible: false });
    }
  };

  toggleInput = () => {
    const { isTextInputVisible } = this.state;

    this.setState({ isTextInputVisible: !isTextInputVisible });
  };

  render() {
    const { isTextInputVisible } = this.state;
    const { name, errors, pickName } = this.props;
    const isSelected = name != null && errors == null;
    return (
      <View style={[styles.container]}>
        <Text>Pick a name</Text>
        <View style={styles.imageInputContainer}>
          <InputImage
            iconSize={50}
            icon="pencil"
            onPress={this.toggleInput}
            isSelected={isSelected}
          />
          <AnimatedText isTextInputVisible={isTextInputVisible} onBlur={pickName} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  name: state.gameForm.name.value,
  errors: state.gameForm.name.errors,
});

export default connect(
  mapStateToProps,
  { pickName },
)(NamePicker);
