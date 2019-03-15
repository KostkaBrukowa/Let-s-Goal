import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import appStyle from '../../const/globalStyles';
import { PURPLE_APP_TINT } from '../../const/const';

export default function FullScreenActivityIndicator() {
  return (
    <View style={[appStyle.container, { flex: 1 }]}>
      <ActivityIndicator color={PURPLE_APP_TINT} size={60} />
    </View>
  );
}
