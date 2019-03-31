import React from 'react';
import { View, StyleSheet } from 'react-native';

const DOT_SIZE = 8;
const styles = StyleSheet.create({
  container: {
    height: 60,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});

const Dot = ({ bgColor }) => <View style={[styles.dot, { backgroundColor: bgColor }]} />;

export default function () {
  return (
    <View style={styles.container}>
      <Dot bgColor="white" />
      <Dot bgColor="#d1d3cf" />
      <Dot bgColor="#7d8889" />
      <Dot bgColor="#4f584e" />
    </View>
  );
}
