/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  ImageBackground,
  View,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import DateTimePicker from '../components/formPickers/DateTime';
import { pickName, pickPlayers, pickField } from '../redux/actions/gameFormActions';
import { saveGame } from '../redux/actions/gameAPIActions';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';
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
    // zIndex: 10,
  },
});

export class NewGameScreen extends Component {
  static navigationOptions = {
    headerRight: <Text>fdlfladsjk</Text>,
  };

  static navigationOptions = ({ navigation }) => {
    const submitForm = navigation.getParam('submitForm');
    console.log(submitForm);

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
    const {
      name, playersNumber, pickName, pickPlayers, navigation,
    } = this.props;
    const { width } = Dimensions.get('window');
    return (
      <KeyboardAwareScrollView
        style={styles.scrollStyle}
        contentContainerStyle={{ paddingBottom: '4%' }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <ImageBackground
            style={{ alignItems: 'center', justifyContent: 'center' }}
            imageStyle={{
              resizeMode: 'cover',
              position: 'absolute',
              zIndex: -10,
              width,
              height: 1116,
              // transform: [{ scaleX: 0.95 }],
            }}
            source={require('../assets/images/background-field-dim.png')}
          >
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
              <FieldPicker navigation={navigation} />
              <FourDots />

              <DateTimePicker />
              {/* <Button onPress={this.submit} title="submit" /> */}
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
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
