import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';

export class JoinScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Join',
    tabBarIcon: BottomNavIcon('md-football'),
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
