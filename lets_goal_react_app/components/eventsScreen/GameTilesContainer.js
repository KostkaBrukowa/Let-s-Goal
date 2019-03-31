import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import appStyle from '../../const/appStyles';

const styles = StyleSheet.create({
  container: {
    ...appStyle.container,
    flex: 1,
  },
});

function GameTilesContainer({ children, title }) {
  return (
    <View style={styles.container}>
      <Text style={appStyle.bigTitle}>{title}</Text>
      <ScrollView horizontal>{children}</ScrollView>
    </View>
  );
}

GameTilesContainer.propTypes = {
  title: PropTypes.string.isRequired,
};

export default GameTilesContainer;
