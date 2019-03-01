import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';
import { connect } from 'react-redux'

import BackgroundImageScroll from '../components/BackGroundImageScroll';
import GameTile from '../components/GameTile'
import {showGame, fetchNearGames} from '../redux/actions/gameAPIActions'

export class JoinScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Join',
    tabBarIcon: BottomNavIcon('md-football'),
    title: 'All events',
  };

  componentDidMount = () => {
    
  }
  

  static propTypes = {};

  render() {
    const { nearGames, fields } = this.props
    const gameTiles = nearGames.map((game) => {
      const field = fields.filter(f => f.id === game.playing_field)[0];
      return (
        <GameTile
          key={game.id}
          street={`ul. ${field.street}`}
          date={game.date}
          onPress={() => this.goToGameDetails(game, field)}
        />
      );
    });

    return (
      <BackgroundImageScroll containerStyle={{ height: '100%' }}>
        {gameTiles}
      </BackgroundImageScroll>
    );
  }
}

const mapStateToProps = state => ({
  nearGames: state.gameAPI.nearGames,
  fields: state.gameAPI.fields,
  isFetchingGames: state.gameAPI.isUsersGamesFetching,
});

// export default EventsScreen;

export default connect(
  mapStateToProps,
  { fetchNearGames, showGame },
)(JoinScreen);
