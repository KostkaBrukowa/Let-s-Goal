import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { PURPLE_APP_TINT } from '../../const/const';
import appStyles from '../../const/appStyles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    width: 250,
    height: 150,
    padding: 10,
  },
  streetName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  ownerName: {
    color: 'silver',
  },
  buttonTitle: {
    color: 'white',
  },
  infoContainer: {
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  buttonContainer: {
    ...appStyles.container,
    backgroundColor: PURPLE_APP_TINT,
    height: 35.4,
    borderRadius: 5,
  },
});

function PickFieldCallout({ street, owner, price }) {
  const priceText = `Price: ${price}$ / h`;
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.streetName}>{street}</Text>
        <Text style={styles.ownerName}>{owner}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.streetName}>{priceText}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonTitle}>Pick</Text>
      </View>
    </View>
  );
}

PickFieldCallout.propTypes = {
  street: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default PickFieldCallout;
