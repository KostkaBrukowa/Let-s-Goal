import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';

import BackgroundImageScroll from '../components/BackGroundImageScroll';
import { PURPLE_APP_TINT } from '../const/const';
import DescriptionRow from '../components/gameDetails/DescriptionRow';
import Title from '../components/gameDetails/Title';
import PlayerImageTile from '../components/gameDetails/PlayerImageTile';

const styles = StyleSheet.create({
  test: {
    borderWidth: 1,
    borderColor: 'white',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '70%',
    padding: '4%',
  },
});

function goToUserDetails(userId) {}

function GameDetailsScreen(props) {
  const { width, height } = Dimensions.get('window');
  const {
    owner, street, date, players, maxPlayers, longitude, price, latitude, game,
  } = props;

  const dateString = date.substring(0, 10).replace(/-/g, '.');
  const hourString = date.substring(11, 16);

  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const playersTiles = [...players].map(player => (
    <PlayerImageTile playerId={player} key={player} />
  ));

  return (
    <BackgroundImageScroll containerStyle={{ paddingBottom: '4%' }}>
      <MapView
        style={{ height: 0.53 * height, width, marginBottom: '3%' }}
        initialRegion={initialRegion}
      >
        <Marker coordinate={{ longitude, latitude }} title={owner} />
      </MapView>
      <View style={[styles.container]}>
        <Title title="Players" />
        <ScrollView style={{ height: 60, marginHorizontal: '2%' }} horizontal>
          {playersTiles}
        </ScrollView>
        <Title title="Game details" />
        <DescriptionRow leftText="Game adress: " rightText={`ul. ${street}`} />
        <DescriptionRow leftText="Date: " rightText={dateString} />
        <DescriptionRow leftText="Time: " rightText={hourString} />
        <DescriptionRow
          leftText="Number of players: "
          rightText={`${players.length}/${maxPlayers}`}
        />
        <DescriptionRow leftText="Price: " rightText={`${price} USD`} />
        <View style={styles.button}>
          <Button
            title="Join the game"
            onPress={() => console.log('joined')}
            color={PURPLE_APP_TINT}
          />
        </View>
      </View>
    </BackgroundImageScroll>
  );
}

GameDetailsScreen.propTypes = {
  name: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  players: PropTypes.array.isRequired,
  maxPlayers: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};

GameDetailsScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('gameName'),
});

const mapStateToProps = state => ({
  game: state.appState.currentGameDetail,
  name: state.appState.currentGameDetail.name,
  date: state.appState.currentGameDetail.date,
  street: state.appState.currentGameField.street,
  owner: state.appState.currentGameField.owner,
  players: state.appState.currentGameDetail.players,
  maxPlayers: state.appState.currentGameDetail.players_number,
  price: state.appState.currentGameField.price_per_hour,
  longitude: state.appState.currentGameField.longitude,
  latitude: state.appState.currentGameField.latitude,
});

export default connect(mapStateToProps)(GameDetailsScreen);
