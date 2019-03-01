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
  const {
    street, date, onPress, side, children,
  } = props;
  const dateString = date && date.substring(0, 10).replace(/-/g, '.');
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.box, { width: side, height: side }]} onPress={onPress}>
        {children}
      </TouchableOpacity>
      {street && <Text style={styles.street}>{street}</Text>}
      {dateString && <Text style={styles.date}>{dateString}</Text>}
    </View>
  );
};

GameTile.propTypes = {
  street: PropTypes.string,
  date: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  side: PropTypes.number,
};

GameTile.defaultProps = {
  street: null,
  date: null,
  side: 130,
};

export default GameTile;
