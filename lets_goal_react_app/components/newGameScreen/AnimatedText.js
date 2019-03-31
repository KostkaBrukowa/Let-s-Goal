import React, { Component } from 'react';
import {
  View, Animated, Dimensions, TextInput, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import appStyle from '../../const/appStyles';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const styles = StyleSheet.create({
  inputText: {
    ...appStyle.smallTitle,
    textAlign: 'center',
    borderColor: 'white',
  },
});

export default class AnimatedText extends Component {
  static defaultProps = {
    keyboardType: 'default',
    screenWidth: 0.75,
  };

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    isTextInputVisible: PropTypes.bool.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    keyboardType: PropTypes.string,
    screenWidth: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    isAnimationRunning: false,
    animatedValue: new Animated.Value(0),
  };

  componentDidUpdate = (prevProps) => {
    const { isTextInputVisible } = this.props;
    if (isTextInputVisible !== prevProps.isTextInputVisible) {
      this.toggleInput(prevProps.isTextInputVisible);
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
    const { animatedValue } = this.state;
    const { isTextInputVisible, value } = this.props;
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
    const { isAnimationRunning } = this.state;
    const { isTextInputVisible, screenWidth } = this.props;
    const { width } = Dimensions.get('window');
    const interpolatedStyle = {
      width: this.interpolateTo(screenWidth * width),
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
            {...this.props}
            // width={screenWidth * width}
            // onBlur={() => onBlur(value)}
            // onFocus={onFocus}
            // value={value}
            // onChangeText={value => this.setState({ value })}
            // keyboardType={keyboardType}
            style={[interpolatedStyle, styles.inputText]}
          />
        )}
      </View>
    );
  }
}
