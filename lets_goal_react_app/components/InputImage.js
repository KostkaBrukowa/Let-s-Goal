import Icon from 'react-native-vector-icons/Foundation';
import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectedInputIcon from './icons/newGame/SelectedInputIcon';
import UnselectedInputIcon from './icons/newGame/UnselectedInputIcon';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBackgroud: {
    backgroundColor: '#3D124A',
  },
  notSelectedBackground: {
    backgroundColor: '#E5E9F2',
  },
});

const InputImage = (props) => {
  const { icon, onPress, isSelected } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          isSelected ? styles.selectedBackgroud : styles.notSelectedBackground,
        ]}
      >
        {isSelected ? <SelectedInputIcon /> : <UnselectedInputIcon icon={icon} />}
      </View>
    </TouchableOpacity>
  );
};

InputImage.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default InputImage;
