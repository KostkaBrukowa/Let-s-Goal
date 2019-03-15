import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';

import BackgroundImageScroll from '../components/BackGroundImageScroll';
import GameTile from '../components/GameTile';
import { fetchNearGames } from '../redux/actions/gameAPIActions';
import { showGame } from '../redux/actions/appStateActions';
import InfoTile from '../components/JoinScreen/InfoTile';

export class JoinScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Join',
    tabBarIcon: BottomNavIcon('md-football'),
  };

  static propTypes = {
    nearGames: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,

    fetchNearGames: PropTypes.func.isRequired,
    showGame: PropTypes.func.isRequired,
    isFetchingGames: PropTypes.bool.isRequired,
  };

  state = {
    visibleTileSet: new Set(),
  };

  componentDidMount = () => {
    const { fetchNearGames } = this.props;
    fetchNearGames({ longitude: -122.4324, latitude: 37.78825 });
  };

  goToGameDetails = (game, field) => {
    const { showGame, navigation } = this.props;
    showGame(game, field);
    navigation.navigate('detailsScreen', { gameName: game.name });
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
    const { nearGames, fields, isFetchingGames } = this.props;
    const { visibleTileSet } = this.state;
    const gameTiles = nearGames.map((game) => {
      const field = fields.filter(f => f.id === game.playing_field)[0];
      return (
        <GameTile key={game.id} onPress={() => this.toggleInfoTile(game.id)} side={160}>
          <InfoTile
            {...game}
            {...field}
            visible={visibleTileSet.contains(game.id)}
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
        onRefresh={() => {}}
        containerStyle={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ fontSize: 20, color: 'white', margin: '3%' }}>Near Events</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {gameTiles}
        </View>
      </BackgroundImageScroll>
    );
  }
}

const mapStateToProps = state => ({
  nearGames: state.gameAPI.nearGames,
  fields: state.gameAPI.fields,
  isFetchingGames: state.gameAPI.isNearGamesFetching,
});

// export default EventsScreen;

export default connect(
  mapStateToProps,
  { fetchNearGames, showGame },
)(JoinScreen);
