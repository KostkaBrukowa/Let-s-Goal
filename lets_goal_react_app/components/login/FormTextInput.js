import React from 'react';
import PropTypes from 'prop-types';
import {
  View, TextInput, StyleSheet, Text, Animated, ScrollView,
} from 'react-native';
import { ERROR_COLOR } from '../../const/const';

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
  errorInput: {
    borderWidth: 3,
    borderColor: ERROR_COLOR,
  },
  errorText: {
    color: 'red',
    fontSize: 19,
  },
});

const AnimatedText = Animated.createAnimatedComponent(Text);

class FormTextInput extends React.Component {
  state = {
    animatedValue: new Animated.Value(1),
  };

  componentDidUpdate = (prevProps) => {
    const { error } = this.props;
    const { animatedValue } = this.state;
    const { error: prevError } = prevProps;

    if (error !== prevError) {
      if (error !== '') {
        Animated.timing(animatedValue, {
          duration: 450,
          toValue: 24,
          // useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animatedValue, {
          duration: 450,
          toValue: 0,
          // useNativeDriver: true,
        }).start();
      }
    }
  };

  render() {
    const { error, style } = this.props;
    const { animatedValue } = this.state;
    return (
      <View>
        <TextInput {...this.props} style={[styles.input, style, error && styles.errorInput]} />
        <ScrollView style={{ height: animatedValue }} horizontal>
          <AnimatedText style={[styles.errorText, { height: animatedValue }]}>{error}</AnimatedText>
        </ScrollView>
      </View>
    );
  }
}

FormTextInput.propTypes = {
  style: PropTypes.object,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};
FormTextInput.defaultProps = {
  style: {},
  placeholder: '',
  error: '',
};

export default FormTextInput;
