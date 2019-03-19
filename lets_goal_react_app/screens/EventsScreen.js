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
  static navigationOptions = {
    tabBarLabel: 'My events',
    tabBarIcon: BottomNavIcon('md-calendar'),
    title: 'My events',
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
    const { fetchUserGames, username } = this.props;
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

    const gameTiles = games
      .filter(game => game.players.includes(userId))
      .map((game) => {
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
      <BackgroundImageScroll
        containerStyle={{ height: '100%' }}
        onRefresh={() => fetchUserGames(username)}
        isLoading={isFetchingGames}
      >
        <View style={[{ paddingRight: '5%', paddingLeft: '5%' }, styles.container]}>
          <Text style={styles.title}>My events</Text>
          <ScrollView horizontal>
            {gameTiles}
            <NewGameTile />
          </ScrollView>
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
