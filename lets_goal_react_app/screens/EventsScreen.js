import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, Button, StyleSheet, ScrollView, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { Constants } from 'expo';

import { login } from '../redux/actions/auth';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';

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

export class EventsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'My events',
    tabBarIcon: BottomNavIcon('md-calendar'),
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
