import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import appStyle from '../../const/globalStyles';
import { PURPLE_APP_TINT } from '../../const/const';

function FullScreenActivityIndicator({ color }) {
  return (
    <View style={[appStyle.container, { flex: 1 }]}>
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
