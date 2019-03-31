import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import appStyle from '../../const/appStyles';
import { PURPLE_APP_TINT } from '../../const/const';

const styles = StyleSheet.create({
  container: {
    ...appStyle.container,
    flex: 1,
  },
});

function FullScreenActivityIndicator({ color }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size={60} />
    </View>
  );
}

FullScreenActivityIndicator.propTypes = {
  color: PropTypes.string,
};
FullScreenActivityIndicator.defaultProps = {
  color: PURPLE_APP_TINT,
};

export default FullScreenActivityIndicator;
