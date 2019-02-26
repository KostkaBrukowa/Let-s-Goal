import React from 'react';
import {
  TouchableOpacity, StyleSheet, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
    backgroundColor: 'black', // change later
  },
  street: {
    fontSize: 15,
    color: 'white',
  },
  date: {
    fontSize: 14,
    color: 'grey',
  },
});

const GameTile = (props) => {
  const { street, date, onPress } = props;
  const dateString = date.substring(0, 10).replace(/-/g, '.');
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} />
      <Text style={styles.street}>{street}</Text>
      <Text style={styles.date}>{dateString}</Text>
    </View>
  );
};

GameTile.propTypes = {
  street: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

GameTile.defaultProps = {};

export default GameTile;
