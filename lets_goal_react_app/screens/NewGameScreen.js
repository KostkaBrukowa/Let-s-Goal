/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import {
  View, Text, Button, ScrollView, TextInput, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import { connect } from 'react-redux';

import DateTimePicker from '../components/DateTime';
import { pickName, pickPlayers, pickField } from '../redux/actions/gameFormActions';
import { saveGame } from '../redux/actions/gameAPIActions';
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

export class NewGameScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Create',
    tabBarIcon: BottomNavIcon('md-add'),
    title: 'Create game',
  };

  state = {
    name: '',
    playersNumber: '',
    field: '',
  };

  static propTypes = {
    name: PropTypes.string,
    playersNumber: PropTypes.string,
    playingField: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    saveGame: PropTypes.func.isRequired,
  };

  submit = () => {
    const {
      name, playersNumber, playingField, date, saveGame,
    } = this.props;

    const game = {
      name,
      playersNumber,
      playingField,
      date,
    };
    saveGame(game);
  };

  render() {
    const { name, playersNumber, field } = this.state;
    const { pickName, pickPlayers, pickField } = this.props;

    return (
      <ScrollView style={styles.scrollStyle} contentContainerStyle={styles.container}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={n => this.setState({ name: n })}
          onBlur={() => pickName(name)}
        />
        <TextInput
          placeholder="Number of players"
          value={playersNumber}
          onChangeText={n => this.setState({ playersNumber: n })}
          keyboardType="numeric"
          onBlur={() => pickPlayers(playersNumber)}
        />
        <TextInput
          placeholder="Field"
          value={field}
          keyboardType="numeric"
          onChangeText={f => this.setState({ field: f })}
          onBlur={() => pickField(field)}
        />

        <DateTimePicker />
        <Button onPress={this.submit} title="submit" />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  name: state.gameForm.name.value,
  playersNumber: state.gameForm.playersNumber.value,
  playingField: state.gameForm.playingField.value,
  date: state.gameForm.date.value,
});

export default connect(
  mapStateToProps,
  {
    pickName,
    pickPlayers,
    pickField,
    saveGame,
  },
)(NewGameScreen);
