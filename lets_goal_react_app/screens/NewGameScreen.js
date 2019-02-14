import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { BOTTOM_ICON_SIZE, BOTTOM_ICON_COLOR_F, BOTTOM_ICON_COLOR_UF } from '../const/const';


export const NewGameIcon = ({ focused }) => (
  <Icon
    name="md-add"
    size={BOTTOM_ICON_SIZE}
    color={focused ? BOTTOM_ICON_COLOR_F : BOTTOM_ICON_COLOR_UF}
  />
);

export class NewGameScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Create',
    tabBarIcon: NewGameIcon,
    title: 'Create game',
  };

  static propTypes = {};

  render() {
    return (
      <View>
        <Text>This is new game page</Text>
      </View>
    );
  }
}

export default NewGameScreen;
