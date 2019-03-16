import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import NavigationService from '../../navigators/NavigationService';

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});

function goToUserDetails(userId) {
  NavigationService.navigate('userDetails', { userId });
}

function PlayerImageTile({ playerId }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => goToUserDetails(playerId)}>
      <Image key={playerId} source={require('../../assets/images/no_image_player_icon.png')} />
    </TouchableOpacity>
  );
}

PlayerImageTile.propTypes = {
  playerId: PropTypes.number.isRequired,
};

export default PlayerImageTile;
