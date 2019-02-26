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
  boxM: {
    width: 130,
    height: 130,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
  },
  boxN: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
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
    fetchUserGames: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { fetchUserGames } = this.props;
    fetchUserGames('Mark');
  };

  static propTypes = {};

  render() {
    const { isFetchingGames, usersGames, fetchUserGames } = this.props;
    // You haven't signed for any games yet. Click button below to add new one or go to Join
    // tab to join existing game.

    return (
      <BackgroundImageScroll
        containerStyle={{ height: '100%' }}
        onRefresh={() => fetchUserGames('Mark')}
        isLoading={isFetchingGames}
      >
        <View style={[{ paddingRight: '8%', paddingLeft: '8%' }, styles.container]}>
          <Text style={styles.title}>My events</Text>
          <ScrollView horizontal>
            {usersGames.map(game => (
              <GameTile street={game.street} date={game.date} onPress={() => {}} />
            ))}

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
  isFetchingGames: state.gameAPI.isUsersGamesFetching,
});

// export default EventsScreen;

export default connect(
  mapStateToProps,
  { fetchUserGames },
)(EventsScreen);
