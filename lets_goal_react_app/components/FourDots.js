import React from 'react';
import { View, StyleSheet } from 'react-native';

const DOT_SIZE = 8;
const styles = StyleSheet.create({
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    // backgroundColor: 'black',
  },
});

const Dot = ({ bgColor }) => <View style={[styles.dot, { backgroundColor: bgColor }]} />;

export default props => (
  <View
    style={{
      height: 60,
      marginTop: 20,
      marginBottom: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Dot bgColor="white" />
    <Dot bgColor="#d1d3cf" />
    <Dot bgColor="#7d8889" />
    <Dot bgColor="#4f584e" />
  </View>
);
