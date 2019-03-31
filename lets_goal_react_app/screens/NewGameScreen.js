/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackgroundImageScroll from '../components/common/BackGroundImageScroll';
import DateTimePicker from '../components/newGameScreen/formPickers/DateTime';
import { pickName, pickPlayers, pickField } from '../redux/actions/gameFormActions';
import { saveGame } from '../redux/actions/gameManagerActions';
import FourDots from '../components/newGameScreen/FourDots';
import TextPicker from '../components/newGameScreen/formPickers/TextPicker';
import FieldPicker from '../components/newGameScreen/formPickers/FieldPicker';
import VectorImageButton from '../components/common/VectorImageButton';

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '3%',
    paddingBottom: '15%',
  },
});

export class NewGameScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const submitForm = navigation.getParam('submitForm');

    return {
      headerRight: <VectorImageButton onPress={submitForm} iconName="check" />,
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
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    this.props.navigation.setParams({
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
    navigation.navigate('eventsScreen');
  };

  scrollTo = (y) => {
    this.scroll.scrollTo({ y, animated: true });
  };

  render() {
    const {
      name, playersNumber, pickName, pickPlayers,
    } = this.props;
    const { height: windowHeight } = Dimensions.get('window');
    return (
      <BackgroundImageScroll
        // eslint-disable-next-line no-return-assign
        scrollRef={scroll => (this.scroll = scroll)}
        containerStyle={{ paddingBottom: '4%' }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <TextPicker
            submitedValue={name.value}
            errors={name.errors}
            pickValue={pickName}
            title="Pick a name"
            icon="pencil"
            onFocus={() => this.scrollTo(0)}
          />
          <FourDots />
          <TextPicker
            submitedValue={playersNumber.value}
            errors={playersNumber.errors}
            pickValue={pickPlayers}
            title="Pick number of players"
            icon="torsos-all"
            keyboardType="numeric"
            screenWidth={0.25}
            onFocus={() => this.scrollTo(windowHeight * 0.29)}
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

const mapDispatchToProps = {
  pickName,
  pickPlayers,
  pickField,
  saveGame,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewGameScreen);
