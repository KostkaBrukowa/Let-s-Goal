import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { PURPLE_APP_TINT } from '../../const/const';

const styles = StyleSheet.create({
  button: { width: 100, marginTop: 5 },
});

function SwitchButton({
  visible, title1, title2, displayFirst, onPress, buttonStyle,
}) {
  if (!visible) return null;

  return (
    <View style={[styles.button, buttonStyle]}>
      <Button title={displayFirst ? title1 : title2} onPress={onPress} color={PURPLE_APP_TINT} />
    </View>
  );
}

SwitchButton.propTypes = {
  visible: PropTypes.bool,
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  displayFirst: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
};

SwitchButton.defaultProps = {
  visible: true,
  displayFirst: true,
  buttonStyle: {},
};

export default SwitchButton;
