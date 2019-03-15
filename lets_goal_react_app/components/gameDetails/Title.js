import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

function Title({ title, containerStyle }) {
  return (
    <View style={[styles.titleContainer, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
};

export default Title;
