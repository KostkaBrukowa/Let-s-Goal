import React from 'react';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: '1%',
  },
  descriptionText: {
    fontSize: 17,
  },
  leftDescriptionContainer: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  leftDescriptionText: {
    color: 'lightgrey',
    textAlign: 'left',
  },
  rightDescriptionContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  rightDescriptionText: {
    color: 'white',
    textAlign: 'right',
  },
});

function DescriptionRow({ leftText, rightText, editMode }) {
  return (
    <View style={[styles.descriptionContainer]}>
      <View style={[styles.leftDescriptionContainer]}>
        <Text style={[styles.descriptionText, styles.leftDescriptionText]}>{leftText}</Text>
      </View>
      <View style={[styles.rightDescriptionContainer]}>
        {!editMode || true ? (
          <Text style={[styles.descriptionText, styles.rightDescriptionText]}>{rightText}</Text>
        ) : (
          <TextInput
            style={[styles.descriptionText, styles.rightDescriptionText]}
            value={rightText}
          />
        )}
      </View>
    </View>
  );
}

DescriptionRow.propTypes = {
  leftText: PropTypes.string.isRequired,
  rightText: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
};
DescriptionRow.defaultProps = {
  editMode: false,
};

export default DescriptionRow;
