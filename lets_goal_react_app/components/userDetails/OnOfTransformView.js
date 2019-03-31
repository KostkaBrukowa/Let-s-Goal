import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

class OnOfTransformView extends PureComponent {
  static propTypes = {
    transformOn: PropTypes.bool.isRequired,
    transformRange: PropTypes.array.isRequired,
    opacity: PropTypes.array,
    duration: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    opacity: [1, 1],
    duration: 300,
  };

  state = {
    animatedValue: new Animated.Value(0.0),
  };

  interpolateAnimated = ({ outRange }) => this.state.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: outRange,
  });

  componentDidUpdate = (prevProps) => {
    const { transformOn } = this.props;
    const { transformOn: prevTransformOn } = prevProps;
    if (transformOn !== prevTransformOn) {
      const { animatedValue } = this.state;
      Animated.timing(animatedValue, {
        toValue: transformOn ? 1 : 0,
        duration: this.props.duration,
        useNativeDriver: true,
      }).start();
    }
  };

  render() {
    const {
      transformRange, opacity: opacityRange, style, children,
    } = this.props;

    const transform = transformRange.map((transformation) => {
      const transName = Object.keys(transformation)[0];
      return {
        [transName]: this.interpolateAnimated({ outRange: transformation[transName] }),
      };
    });

    const opacity = opacityRange && this.interpolateAnimated({ outRange: opacityRange });
    return <Animated.View style={[style, { transform, opacity }]}>{children}</Animated.View>;
  }
}

export default OnOfTransformView;
