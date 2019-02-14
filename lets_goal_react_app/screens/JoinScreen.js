import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { BOTTOM_ICON_SIZE, BOTTOM_ICON_COLOR_F, BOTTOM_ICON_COLOR_UF } from '../const/const';

const JoinGameIcon = ({ focused }) => (
  <Icon
    name="md-football"
    size={BOTTOM_ICON_SIZE}
    color={focused ? BOTTOM_ICON_COLOR_F : BOTTOM_ICON_COLOR_UF}
  />
);

export class JoinScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Join',
    tabBarIcon: JoinGameIcon,
    title: 'All events',
  };

  static propTypes = {};

  render() {
    return (
      <View>
        <Text>This is join page</Text>
      </View>
    );
  }
}

export default JoinScreen;
