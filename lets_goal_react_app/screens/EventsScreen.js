/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { fetchUserGames } from '../redux/actions/gameAPIActions';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';
import { PURPLE_APP_TINT } from '../const/const';
import GameTile from '../components/GameTile';
import BackgroundImageScroll from '../components/BackGroundImageScroll';
import { showGame } from '../redux/actions/appStateActions';
import NavigationService from '../navigators/NavigationService';
import EditButton from '../components/userDetails/EditButton';
import NewGameTile from '../components/userDetails/NewGameTile';
import VectorImageButton from '../components/ImageButton';
import GameTilesContainer from '../components/eventsScreen/GameTilesContainer';

function createGameTile(game, fields, onPress) {
  const field = fields.filter(f => f.id === game.playing_field)[0];
  return (
    <GameTile
      key={game.id}
      street={`ul. ${field.street}`}
      date={game.date}
      name={game.name}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    paddingTop: '10%',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export class EventsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const userId = navigation.getParam('userId');
    const onPress = userId && (() => navigation.push('userDetails', { userId }));

    return {
      tabBarLabel: 'My events',
      tabBarIcon: BottomNavIcon('md-calendar'),
      title: 'My events',
      headerRight: <VectorImageButton iconName="user-circle" onPress={onPress} size={32} />,
    };
  };

  static propTypes = {
    isFetchingGames: PropTypes.bool.isRequired,
    games: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    fetchUserGames: PropTypes.func.isRequired,
    showGame: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  };

  componentDidMount = () => {
    const {
      fetchUserGames, username, navigation, userId,
    } = this.props;
    navigation.setParams({ userId });
    fetchUserGames(username);
  };

  goToGameDetails(game) {
    const { navigation } = this.props;
    navigation.navigate('detailsScreen', { gameName: game.name, gameId: game.id });
  }

  render() {
    const {
      isFetchingGames, games, fields, fetchUserGames, username, userId,
    } = this.props;
    // You haven't signed for any games yet. Click button below to add new one or go to Join
    // tab to join existing game.

    const createdGameTiles = games
      .filter(game => game.owner === userId)
      .map(game => createGameTile(game, fields, () => this.goToGameDetails(game)));

    const joinedGameTiles = games
      .filter(game => game.owner !== userId && game.players.includes(userId))
      .map(game => createGameTile(game, fields, () => this.goToGameDetails(game)));

    return (
      <BackgroundImageScroll
        containerStyle={{ height: '100%' }}
        onRefresh={() => fetchUserGames(username)}
        isLoading={isFetchingGames}
      >
        <View style={[{ paddingRight: '5%', paddingLeft: '5%' }, styles.container]}>
          {createdGameTiles.length !== 0 && (
            <GameTilesContainer title="My events">
              {createdGameTiles}
              <NewGameTile />
            </GameTilesContainer>
          )}
          {joinedGameTiles.length !== 0 && (
            <GameTilesContainer title="Joined events">{joinedGameTiles}</GameTilesContainer>
          )}
        </View>
      </BackgroundImageScroll>
    );
  }
}

const mapStateToProps = state => ({
  games: state.gameAPI.games,
  fields: state.gameAPI.fields,
  isFetchingGames: state.gameAPI.isUsersGamesFetching,
  username: state.user.username,
  userId: state.user.userId,
});

// export default EventsScreen;

export default connect(
  mapStateToProps,
  { fetchUserGames, showGame },
)(EventsScreen);
