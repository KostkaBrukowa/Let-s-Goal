/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';

import BackgroundImageScroll from '../components/BackGroundImageScroll';
import GameTile from '../components/GameTile';
import { fetchNearGames } from '../redux/actions/gameAPIActions';
import { showGame, fetchLocation } from '../redux/actions/appStateActions';
import InfoTile from '../components/JoinScreen/InfoTile';
import NavigationService from '../navigators/NavigationService';
import appStyle from '../const/globalStyles';

const styles = StyleSheet.create({
  headerTitle: {
    ...appStyle.bigTitle,
    margin: '3%',
  },
  scrollContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tilesContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

export class JoinScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Join',
    tabBarIcon: BottomNavIcon('md-football'),
  };

  static propTypes = {
    nearGames: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    nearGamesError: PropTypes.string,
    location: PropTypes.object,
    isFetchingGames: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,

    fetchNearGames: PropTypes.func.isRequired,
    showGame: PropTypes.func.isRequired,
    fetchLocation: PropTypes.func.isRequired,
  };

  state = {
    visibleTileSet: new Set(),
  };

  componentDidMount = () => {
    const { location, fetchLocation } = this.props;
    if (!location) fetchLocation();
    else this.fetchGames();
  };

  componentDidUpdate = (prevProps) => {
    const { nearGamesError } = this.props;
    const { nearGamesError: prevNearGamesError } = prevProps;
    if (nearGamesError !== prevNearGamesError) {
      ToastAndroid.show('Could not connect to a sever', ToastAndroid.SHORT);
    }

    const { location } = this.props;
    const { location: prevLocation } = prevProps;
    if (location !== prevLocation) {
      this.fetchGames();
    }
  };

  fetchGames = () => {
    const { fetchNearGames, location } = this.props;
    location && fetchNearGames(location);
  };

  goToGameDetails = (game) => {
    NavigationService.navigate('detailsScreen', { gameId: game.id, gameName: game.name });
  };

  toggleInfoTile = (gameId) => {
    const { visibleTileSet } = this.state;
    this.setState({
      visibleTileSet: visibleTileSet.contains(gameId)
        ? visibleTileSet.remove(gameId)
        : visibleTileSet.add(gameId),
    });
  };

  render() {
    const {
      fields, isFetchingGames, userId, nearGames,
    } = this.props;
    const { visibleTileSet } = this.state;
    const gameTiles = nearGames
      .filter(game => !game.players.includes(userId))
      .map((game) => {
        const field = fields.filter(f => f.id === game.playing_field)[0];
        return (
          <GameTile
            key={game.id}
            name={game.name}
            onPress={() => this.toggleInfoTile(game.id)}
            side={160}
          >
            <InfoTile
              {...game}
              {...field}
              visible={!visibleTileSet.contains(game.id)}
              currentPlayers={game.players.length}
              maxPlayers={game.players_number}
              onButtonPress={() => this.goToGameDetails(game, field)}
            />
          </GameTile>
        );
      });

    return (
      <BackgroundImageScroll
        isLoading={isFetchingGames}
        onRefresh={this.fetchGames}
        containerStyle={styles.scrollContainer}
      >
        <Text style={styles.headerTitle}>Near Events</Text>
        {gameTiles.length === 0 ? (
          <Text style={[appStyle.smallTitle, { color: 'lightgray' }]}>
            Ups... there are no around you
          </Text>
        ) : (
          <View style={styles.tilesContainerStyle}>{gameTiles}</View>
        )}
      </BackgroundImageScroll>
    );
  }
}

const mapStateToProps = state => ({
  nearGames: state.gameAPI.nearGames,
  fields: state.gameAPI.fields,
  isFetchingGames: state.gameAPI.isNearGamesFetching,
  nearGamesError: state.gameAPI.nearGamesError,
  location: state.appState.location,
  userId: state.user.userId,
});

// export default EventsScreen;

export default connect(
  mapStateToProps,
  { fetchNearGames, showGame, fetchLocation },
)(JoinScreen);
