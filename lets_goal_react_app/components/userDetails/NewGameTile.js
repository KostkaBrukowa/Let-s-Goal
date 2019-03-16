import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import NavigationService from '../../navigators/NavigationService';
import { PURPLE_APP_TINT } from '../../const/const';

const styles = StyleSheet.create({
  textInBox: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
  },
  box: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
    backgroundColor: PURPLE_APP_TINT,
    justifyContent: 'center',
  },
});

function NewGameTile() {
  return (
    <TouchableOpacity style={[styles.box]} onPress={() => NavigationService.navigate('newGame')}>
      <Text style={styles.textInBox}>Add new event</Text>
    </TouchableOpacity>
  );
}

export default NewGameTile;
