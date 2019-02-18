/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import {
  View, Text, Button, ScrollView, TextInput, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import { connect } from 'react-redux';

import DateTimePicker from '../components/formPickers/DateTime';
import { pickName, pickPlayers, pickField } from '../redux/actions/gameFormActions';
import { saveGame } from '../redux/actions/gameAPIActions';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';
import FourDots from '../components/FourDots';
// import NamePicker from '../components/formPickers/NamePicker';
import TextPicker from '../components/formPickers/TextPicker';

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
    name: PropTypes.object,
    playersNumber: PropTypes.object,
    playingField: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    saveGame: PropTypes.func.isRequired,
    pickName: PropTypes.func.isRequired,
    pickPlayers: PropTypes.func.isRequired,
  };

  submit = () => {
    const {
      name, playersNumber, playingField, date, saveGame,
    } = this.props;

    const game = {
      name: name.value,
      playersNumber: playersNumber.value,
      playingField,
      date,
    };
    saveGame(game);
  };

  render() {
    const { field } = this.state;
    const {
      name, playersNumber, pickName, pickPlayers, pickField,
    } = this.props;
    return (
      <ScrollView style={styles.scrollStyle} contentContainerStyle={styles.container}>
        <TextPicker
          value={name.value}
          errors={name.errors}
          pickValue={pickName}
          title="Pick number of players"
          icon="pencil"
        />
        <FourDots />
        <TextPicker
          value={playersNumber.value}
          errors={playersNumber.errors}
          pickValue={pickPlayers}
          title="Pick number of players"
          icon="address-book"
          keyboardType="numeric"
        />
        <FourDots />
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
  name: state.gameForm.name,
  playersNumber: state.gameForm.playersNumber,
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
