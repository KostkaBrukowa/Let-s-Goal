import React, { Component } from 'react';
import {
  View, Animated, Dimensions, TextInput, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const styles = StyleSheet.create({
  inputText: {
    textAlign: 'center',
    color: 'white',
    borderColor: 'white',
    fontSize: 16,
  },
});

export default class AnimatedText extends Component {
  static defaultProps = {
    keyboardType: 'default',
    widthPart: 0.75,
  };

  static propTypes = {
    isTextInputVisible: PropTypes.bool.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    keyboardType: PropTypes.string,
    widthPart: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    isAnimationRunning: false,
    animatedValue: new Animated.Value(0),
    value: '',
  };

  componentDidUpdate = (prevProps) => {
    const { isTextInputVisible } = this.props;
    if (isTextInputVisible !== prevProps.isTextInputVisible) {
      this.toggleInput(prevProps.isTextInputVisible);
      //   if (isTextInputVisible) this.textInput.current.focus();
    }
  };

  interpolateTo = (value) => {
    const { animatedValue } = this.state;

    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, value],
    });
  };

  runAnimation = ({ toValue, duration }) => {
    const { animatedValue, value } = this.state;
    const { isTextInputVisible } = this.props;
    Animated.timing(animatedValue, {
      toValue,
      duration,
    }).start(() => {
      // eslint-disable-next-line no-underscore-dangle
      if (isTextInputVisible && value === '') this.textInput.current._component.focus();

      this.setState({ isAnimationRunning: false });
    });
  };

  showTextInput = () => this.runAnimation({ toValue: 1, duration: 500 });

  hideTextInput = () => this.runAnimation({ toValue: 0, duration: 500 });

  toggleInput = (hide) => {
    if (hide) this.hideTextInput();
    else this.showTextInput();

    this.setState({ isAnimationRunning: true });
  };

  render() {
    const { isAnimationRunning, value } = this.state;
    const {
      isTextInputVisible, onBlur, onFocus, keyboardType, widthPart,
    } = this.props;
    const { width } = Dimensions.get('window');
    const interpolatedStyle = {
      width: this.interpolateTo(widthPart * width),
      borderWidth: this.interpolateTo(1),
      borderRadius: this.interpolateTo(15),
      height: this.interpolateTo(35),
      marginTop: this.interpolateTo(20),
    };
    return (
      <View>
        {(isAnimationRunning || isTextInputVisible) && (
          <AnimatedTextInput
            ref={this.textInput}
            onBlur={() => onBlur(value)}
            onFocus={onFocus}
            placeholder={!isTextInputVisible ? '' : ''}
            value={!isTextInputVisible ? '' : value}
            onChangeText={value => this.setState({ value })}
            keyboardType={keyboardType}
            style={[interpolatedStyle, styles.inputText]}
          />
        )}
      </View>
    );
  }
}
