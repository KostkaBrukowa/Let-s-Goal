import React, { Component } from 'react';
import {
  View, Text, Button, ScrollView, TextInput, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { Constants } from 'expo';

import { BOTTOM_ICON_SIZE, BOTTOM_ICON_COLOR_F, BOTTOM_ICON_COLOR_UF } from '../const/const';
import DateTimePicker from '../components/DateTime';

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

export const NewGameIcon = ({ focused }) => (
  <Icon
    name="md-add"
    size={BOTTOM_ICON_SIZE}
    color={focused ? BOTTOM_ICON_COLOR_F : BOTTOM_ICON_COLOR_UF}
  />
);
NewGameIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
};

export class NewGameScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Create',
    tabBarIcon: NewGameIcon,
    title: 'Create game',
  };

  state = {
    name: '',
    playersNumber: '',
    field: '',
  };

  static propTypes = {};

  render() {
    const { name, playersNumber, field } = this.state;

    return (
      <ScrollView style={styles.scrollStyle} contentContainerStyle={styles.container}>
        <TextInput placeholder="Name" value={name} onChangeText={n => this.setState({ name: n })} />
        <TextInput
          placeholder="Number of players"
          value={playersNumber}
          onChangeText={n => this.setState({ playersNumber: n })}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Field"
          value={field}
          onChangeText={f => this.setState({ field: f })}
        />

        <DateTimePicker />
        <Button onPress={() => console.log('submit')} title="submit" />
      </ScrollView>
    );
  }
}

export default NewGameScreen;
