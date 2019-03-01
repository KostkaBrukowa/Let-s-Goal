/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import { Set } from 'immutable';

import { login } from '../redux/actions/auth';
import { fetchUserGames } from '../redux/actions/gameAPIActions';
import BottomNavIcon from '../components/icons/navigation/BottomNavIcon';
import PickFieldCallout from '../components/PickFieldCallout';
import { ALMOST_WHITE_TINT, PURPLE_APP_TINT } from '../const/const';
import GameTile from '../components/GameTile';
import BackgroundImageScroll from '../components/BackGroundImageScroll';
import { showGame } from '../redux/actions/appStateActions';

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    // flex: 1,
  },
  box: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
  },
  title: {
    // width: '100%',
    paddingTop: '10%',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  textInBox: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
  },
  addNewEventBox: {
    backgroundColor: PURPLE_APP_TINT,
    justifyContent: 'center',
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
    usersGames: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    fetchUserGames: PropTypes.func.isRequired,
    showGame: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { fetchUserGames } = this.props;
    fetchUserGames('Alex');
  };

  goToGameDetails(game, field) {
    const { showGame, navigation } = this.props;
    showGame(game, field);
    navigation.push('detailsScreen', { gameName: game.name });
  }

  render() {
    const {
      isFetchingGames, usersGames, fields, fetchUserGames,
    } = this.props;
    // You haven't signed for any games yet. Click button below to add new one or go to Join
    // tab to join existing game.

    const gameTiles = usersGames.map((game) => {
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
        onRefresh={() => fetchUserGames('Alex')}
        isLoading={isFetchingGames}
      >
        <View style={[{ paddingRight: '5%', paddingLeft: '5%' }, styles.container]}>
          <Text style={styles.title}>My events</Text>
          <ScrollView horizontal>
            {gameTiles}
            <TouchableOpacity style={[styles.box, styles.addNewEventBox]}>
              <Text style={styles.textInBox}>Add new event</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BackgroundImageScroll>
    );
  }
}

const mapStateToProps = state => ({
  usersGames: state.gameAPI.usersGames,
  fields: state.gameAPI.fields,
  isFetchingGames: state.gameAPI.isUsersGamesFetching,
});

// export default EventsScreen;

export default connect(
  mapStateToProps,
  { fetchUserGames, showGame },
)(EventsScreen);
