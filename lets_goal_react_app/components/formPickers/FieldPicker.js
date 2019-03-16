/* eslint-disable react/require-default-props */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputImage from '../InputImage';
import NavigationService from '../../navigators/NavigationService';

const FieldPicker = (props) => {
  const { field, fieldErrors } = props;
  const isSelected = field != null && !fieldErrors;
  return (
    <View>
      <InputImage
        icon="map"
        iconSize={50}
        onPress={() => NavigationService.navigate('map')}
        isSelected={isSelected}
        title="Pick a field"
        isInvalid={fieldErrors != null}
      />
    </View>
  );
};

FieldPicker.propTypes = {
  field: PropTypes.number,
  fieldErrors: PropTypes.string,
};

const mapStateToProps = state => ({
  field: state.gameForm.playingField.value,
  fieldErrors: state.gameForm.playingField.errors,
});

export default connect(mapStateToProps)(FieldPicker);
