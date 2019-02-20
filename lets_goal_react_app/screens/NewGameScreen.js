/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DateTimePicker from '../components/formPickers/DateTime';
import { pickName, pickPlayers, pickField } from '../redux/actions/gameFormActions';
import { saveGame } from '../redux/actions/gameAPIActions';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';
import FourDots from '../components/FourDots';
import TextPicker from '../components/formPickers/TextPicker';
import FieldPicker from '../components/formPickers/FieldPicker';

const styles = StyleSheet.create({
  scrollStyle: {
    // marginTop: Constants.statusBarHeight + 9,
    paddingTop: '5%',
    // paddingBottom: '5%',
    flex: 1,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    // flex: 1,
  },
});

export class NewGameScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Create',
    tabBarIcon: BottomNavIcon('md-add'),
    title: 'Create game',
  };

  state = {
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
      name, playersNumber, pickName, pickPlayers, navigation,
    } = this.props;
    return (
      <ScrollView style={styles.scrollStyle} contentContainerStyle={styles.container}>
        <TextPicker
          value={name.value}
          errors={name.errors}
          pickValue={pickName}
          title="Pick a name"
          icon="pencil"
        />
        <FourDots />
        <TextPicker
          value={playersNumber.value}
          errors={playersNumber.errors}
          pickValue={pickPlayers}
          title="Pick number of players"
          icon="torsos-all"
          keyboardType="numeric"
          width={0.25}
        />
        <FourDots />
        <FieldPicker navigation={navigation} />
        <FourDots />

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
