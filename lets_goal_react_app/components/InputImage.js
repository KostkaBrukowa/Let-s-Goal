import Icon from 'react-native-vector-icons/Foundation';
import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

const InputPicture = ({ icon }) => <Icon name={icon} size={70} color="#152730" />;

const SelectedPicture = () => <Icon name="check" size={70} color="white" />;

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
        {isSelected ? <SelectedPicture /> : <InputPicture icon={icon} />}
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
