import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, Button, StyleSheet, ScrollView, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { Constants } from 'expo';

import { login } from '../redux/actions/auth';
import { BOTTOM_ICON_SIZE, BOTTOM_ICON_COLOR_F, BOTTOM_ICON_COLOR_UF } from '../const/const';

const styles = StyleSheet.create({
  scrollStyle: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
});

export const EventsIcon = ({ focused }) => (
  <Icon
    name="md-calendar"
    size={BOTTOM_ICON_SIZE}
    color={focused ? BOTTOM_ICON_COLOR_F : BOTTOM_ICON_COLOR_UF}
  />
);
EventsIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

export class EventsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'My events',
    tabBarIcon: EventsIcon,
    title: 'My events',
  };

  static propTypes = {};

  render() {
    return (
      <ScrollView style={styles.scrollStyle} contentContainerStyle={styles.container}>
        <Button onPress={() => login('mary', 'poppins')} title="submit" />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({});

// export default EventsScreen;

export default connect(
  mapStateToProps,
  {},
)(EventsScreen);
