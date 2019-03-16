import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { PURPLE_APP_TINT } from '../../const/const';

const styles = StyleSheet.create({
  button: { width: 100, marginTop: 5 },
});

function EditButton({ editMode, visible, onPress }) {
  if (!visible) return null;

  return (
    <View style={styles.button}>
      <Button title={editMode ? 'Save' : 'Edit'} onPress={onPress} color={PURPLE_APP_TINT} />
    </View>
  );
}

EditButton.propTypes = {
  editMode: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default EditButton;
