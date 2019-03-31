import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import SelectedInputIcon from '../icons/newGame/SelectedInputIcon';
import UnselectedInputIcon from '../icons/newGame/UnselectedInputIcon';
import {
  NEW_GAME_CIRCLE_SIZE,
  PURPLE_APP_TINT,
  ALMOST_WHITE_TINT,
  NEW_GAME_ICON_SIZE,
  ERROR_COLOR,
} from '../../const/const';
import appStyles from '../../const/appStyles';

const styles = StyleSheet.create({
  container: appStyles.container,
  imageContainer: {
    width: NEW_GAME_CIRCLE_SIZE,
    height: NEW_GAME_CIRCLE_SIZE,
    borderRadius: NEW_GAME_CIRCLE_SIZE / 2,
    marginTop: 9,
  },
  selectedBackgroud: {
    backgroundColor: PURPLE_APP_TINT,
  },
  notSelectedBackground: {
    backgroundColor: ALMOST_WHITE_TINT,
  },
  error: {
    borderColor: ERROR_COLOR,
  },
  title: appStyles.smallTitle,
});

const InputImage = (props) => {
  const {
    icon, onPress, isSelected, iconSize, title, isInvalid,
  } = props;
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            styles.container,
            styles.imageContainer,
            isSelected ? styles.selectedBackgroud : styles.notSelectedBackground,
          ]}
        >
          {isSelected ? (
            <SelectedInputIcon />
          ) : (
            <UnselectedInputIcon isInvalid={isInvalid} size={iconSize} icon={icon} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

InputImage.defaultProps = {
  iconSize: NEW_GAME_ICON_SIZE,
  title: '',
};

InputImage.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  iconSize: PropTypes.number,
  title: PropTypes.string,
  isInvalid: PropTypes.bool.isRequired,
};

export default InputImage;
