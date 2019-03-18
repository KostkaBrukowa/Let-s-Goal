import React from 'react';
import {
  StyleSheet, View, Dimensions, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import caseConverter from 'case-converter';

import BackgroundImageScroll from '../components/BackGroundImageScroll';
import DescriptionRow from '../components/gameDetails/DescriptionRow';
import Title from '../components/gameDetails/Title';
import PlayerImageTile from '../components/gameDetails/PlayerImageTile';
import DownButton from '../components/gameDetails/DownButton';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  horizontalScroll: {
    height: 60,
    marginHorizontal: '2%',
  },
});

function GameDetailsScreen(props) {
  const { width, height } = Dimensions.get('window');
  const { game, field, userId } = props;
  const {
    owner: gameOwner, date, players, playersNumber: maxPlayers,
  } = game;
  const {
    street, longitude, latitude, owner, pricePerHour,
  } = field;

  const dateString = date.substring(0, 10).replace(/-/g, '.');
  const hourString = date.substring(11, 16);

  const numberOfPlayersStr = `${players.length}/${maxPlayers}`;

  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const mapStyle = { height: 0.53 * height, width, marginBottom: '3%' };

  const playersTiles = players.map(player => <PlayerImageTile playerId={player} key={player} />);

  return (
    <BackgroundImageScroll containerStyle={{ paddingBottom: '4%' }}>
      <MapView style={mapStyle} initialRegion={initialRegion}>
        <Marker coordinate={{ longitude, latitude }} title={owner} />
      </MapView>
      <View style={[styles.container]}>
        <Title title="Players" />
        <ScrollView style={styles.horizontalScroll} horizontal>
          {playersTiles}
        </ScrollView>
        <Title title="Game details" />
        <DescriptionRow leftText="Game adress: " rightText={`ul. ${street}`} />
        <DescriptionRow leftText="Date: " rightText={dateString} />
        <DescriptionRow leftText="Time: " rightText={hourString} />
        <DescriptionRow leftText="Number of players: " rightText={numberOfPlayersStr} />
        <DescriptionRow leftText="Price: " rightText={`${pricePerHour} USD`} />
        <DownButton players={players} owner={gameOwner} />
      </View>
    </BackgroundImageScroll>
  );
}

GameDetailsScreen.propTypes = {
  game: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
};

GameDetailsScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('gameName'),
});

const mapStateToProps = state => ({
  game: caseConverter.toCamelCase(state.appState.currentGameDetail),
  field: caseConverter.toCamelCase(state.appState.currentGameField),
  userId: state.user.userId,
});

export default connect(mapStateToProps)(GameDetailsScreen);
