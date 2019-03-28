/* eslint-disable react/prop-types */
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
import FullScreenActivityIndicator from '../components/userDetails/FullScreenActivityIndicator';
import BackgroundImage from '../components/BackgroundImage';
import VectorImageButton from '../components/ImageButton';

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
  map: {
    height: 0.53 * Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    marginBottom: '3%',
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class GameDetailsScreen extends React.Component {
  componentDidUpdate = (prevProps) => {
    const { games } = this.props;
    const { games: prevGames } = prevProps;
    if (games !== prevGames) {
      console.log('and here');

      const { navigation } = this.props;
      const currentGame = games.find(game => game.id === navigation.getParam('gameId'));
      if (!currentGame) {
        navigation.goBack();
      }
    }
  };

  render() {
    const { games, fields, navigation } = this.props;
    const gameId = navigation.getParam('gameId');
    const game = games.find(game => game.id === gameId);

    if (!game) {
      return (
        <BackgroundImage dim stackHeader>
          <FullScreenActivityIndicator color="white" />
        </BackgroundImage>
      );
    }

    const field = fields.find(field => field.id === game.playing_field);

    const {
      owner: gameOwner, date, players, players_number: maxPlayers,
    } = game;
    const {
      street, longitude, latitude, owner, price_per_hour: pricePerHour,
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

    const playersTiles = players.map(player => <PlayerImageTile playerId={player} key={player} />);

    return (
      <BackgroundImageScroll containerStyle={{ paddingBottom: '4%' }}>
        <MapView style={styles.map} initialRegion={initialRegion}>
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
          <DownButton gameId={game.id} players={players} owner={gameOwner} />
        </View>
      </BackgroundImageScroll>
    );
  }
}

GameDetailsScreen.propTypes = {
  userId: PropTypes.number.isRequired,
};

GameDetailsScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('gameName'),
});

const mapStateToProps = state => ({
  games: state.gameAPI.games,
  fields: state.gameAPI.fields,
  userId: state.user.userId,
});

export default connect(mapStateToProps)(GameDetailsScreen);
