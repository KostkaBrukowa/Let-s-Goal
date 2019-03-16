/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackgroundImageScroll from '../components/BackGroundImageScroll';
import DateTimePicker from '../components/formPickers/DateTime';
import { pickName, pickPlayers, pickField } from '../redux/actions/gameFormActions';
import { saveGame } from '../redux/actions/gameAPIActions';
import FourDots from '../components/FourDots';
import TextPicker from '../components/formPickers/TextPicker';
import FieldPicker from '../components/formPickers/FieldPicker';
import ImageButton from '../components/ImageButton';

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '3%',
    paddingBottom: '15%',
    opacity: 1,
  },
});

export class NewGameScreen extends Component {
  static navigationOptions = {
    headerRight: <Text>fdlfladsjk</Text>,
  };

  static navigationOptions = ({ navigation }) => {
    const submitForm = navigation.getParam('submitForm');

    return {
      headerRight: <ImageButton onPress={submitForm} iconName="check" />,
    };
  };

  static propTypes = {
    name: PropTypes.object,
    playersNumber: PropTypes.object,
    playingField: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    saveGame: PropTypes.func.isRequired,
    pickName: PropTypes.func.isRequired,
    pickPlayers: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    navigation.setParams({
      submitForm: this.submit,
    });
  };

  submit = () => {
    const {
      name, playersNumber, playingField, date, saveGame, navigation,
    } = this.props;

    const game = {
      name: name.value,
      playersNumber: playersNumber.value,
      playingField,
      date,
    };
    saveGame(game);
    navigation.navigate('events');
  };

  render() {
    const {
      name, playersNumber, pickName, pickPlayers,
    } = this.props;
    return (
      <BackgroundImageScroll containerStyle={{ paddingBottom: '4%' }}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
          <FieldPicker />
          <FourDots />
          <DateTimePicker />
        </KeyboardAvoidingView>
      </BackgroundImageScroll>
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
