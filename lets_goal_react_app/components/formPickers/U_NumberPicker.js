import React, { Component } from 'react';
import {
  View, Text, Button, PanResponder, Animated, Dimensions,
} from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import PointingRod from '../PointingRod';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const WIDTH = 100;
const HEIHGT = 100;
const RADIUS = 50;
const PARTS = 20;

export default class MyPicker extends Component {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');
    this.state = {
      pan: { x: WIDTH / 2, y: HEIHGT / 2 },
      center: { x: WIDTH / 2, y: HEIHGT / 2 },
      yOffset: 0,
      position: 0,
    };

    this.panResponder = PanResponder.create({
      onPanResponderGrant: (evt, gestureState) => {
        console.log('granted');
      },
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: (e, gesture) => {
        this.calculateLineEnd({ x: gesture.moveX, y: gesture.moveY });
      },
    });
  }

  componentDidMount = () => {
    const f = () => {
      this.container.measure((x, y, width, height, pageX, pageY) => {
        this.setState({ yOffset: y });
        console.log(y);
      });
    };
    setTimeout(f, 0);
  };

  calculateLineEnd = ({ x, y }) => {
    const { x: currX, y: currY } = this.state.pan;
    if (Math.abs(x - currX) < 0.5 && Math.abs(y - currY) < 0.5) return;

    const { x: centerX, y: centerY } = this.state.center;

    const [dx, dy] = [x - centerX, y - centerY - this.props.yOffset];

    const partAngle = (2 * Math.PI) / PARTS;
    const angle = Math.atan2(dy, dx);
    const position = Math.floor(angle / partAngle);

    const newX = RADIUS * Math.cos(angle) + centerX;
    const newY = RADIUS * Math.sin(angle) + centerY;
    this.setState({
      position: position + 5 < 0 ? position + 5 + 20 : position + 5,
      pan: { x: newX, y: newY },
    });
  };

  render() {
    const { pan } = this.state;

    const lineEnd = { x: pan.x, y: pan.y };
    return (
      <View
        style={{
          borderWidth: 1,
          width: WIDTH,
          height: HEIHGT,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ref={view => (this.container = view)}
      >
        <Text>{this.state.position}</Text>
        <PointingRod x={lineEnd.x} y={lineEnd.y} panResponder={this.panResponder} />
      </View>
    );
  }
}

// componentDidMount = () => {
// console.log(Object.keys(this.container.viewConfig.Commands));
// console.log(this.container.measure);
// const f = () => {
//   this.container.measure((x, y, width, height, pageX, pageY) => {
//     console.log(x);
//     console.log(width);
//     this.setState({ container: { x, y } });
//   });
// };
// setTimeout(f, 0);
// };

// shouldComponentUpdate = (nextProps, nextState) => {
//   const { valx, valy } = this.state;
//   const { newX, newY } = nextState;
//   const updatedDiff = 20.8;
//   console.log(valx);
//   console.log(Math.abs(valx - newX));
//   return Math.abs(valx - newX) > updatedDiff || Math.abs(valy - newY) > updatedDiff;

// };
