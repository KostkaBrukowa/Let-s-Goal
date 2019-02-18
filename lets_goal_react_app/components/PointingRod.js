import React, { Component } from 'react';
import {
  View, Text, Button, PanResponder, Animated, Dimensions,
} from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const PointingRod = ({ x, y, panResponder }) => (
  <Svg height="100%" width="100%">
    <Line x1="50%" y1="50%" x2={x} y2={y} stroke="red" strokeWidth="3" />
    <Circle cx={x} cy={y} r={10} fill="black" {...panResponder.panHandlers} />
  </Svg>
);

export default PointingRod;
