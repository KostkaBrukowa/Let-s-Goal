import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
  },
});

function Info({ text }) {
  return <Text style={styles.textStyle}>{text}</Text>;
}

Info.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Info;
