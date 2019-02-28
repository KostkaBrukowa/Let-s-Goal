import React from 'react';
import {
  Image, StyleSheet, View, Text, Dimensions, ScrollView, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Marker, Callout } from 'react-native-maps';

import BackgroundImageScroll from '../components/BackGroundImageScroll';
import { PURPLE_APP_TINT } from '../const/const';

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
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    width: '90%',
    padding: '1%',
  },
  descriptionText: {
    fontSize: 16,
  },
  leftDescriptionContainer: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  leftDescriptionText: {
    color: 'grey',
    textAlign: 'left',
  },
  rightDescriptionContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  rightDescriptionText: {
    color: 'white',
    textAlign: 'right',
  },
  button: {
    width: '70%',
    padding: '4%',
  },
});

const DescriptionRow = ({ leftText, rightText }) => (
  <View style={[styles.descriptionContainer]}>
    <View style={[styles.leftDescriptionContainer]}>
      <Text style={[styles.descriptionText, styles.leftDescriptionText]}>{leftText}</Text>
    </View>
    <View style={[styles.rightDescriptionContainer]}>
      <Text style={[styles.descriptionText, styles.rightDescriptionText]}>{rightText}</Text>
    </View>
  </View>
);

const Title = ({ title }) => (
  <View style={[styles.titleContainer]}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function GameDetailsScreen(props) {
  const { width, height } = Dimensions.get('window');
  const {
    name, street, date, players, maxPlayers, longitude: lng, latitude: lat,
  } = props;

  const dateString = date.substring(0, 10).replace(/-/g, '.');
  const hourString = date.substring(11, 16);

  const longitude = parseFloat(lng);
  const latitude = parseFloat(lat);
  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const playersTiles = [...players, 2, 3, 4, 5, 6, 7, 8, 9].map(player => (
    <Image key={player} source={require('../assets/images/no_image_player_icon.png')} />
  ));

  return (
    <BackgroundImageScroll containerStyle={{ paddingBottom: '4%' }}>
      <MapView
        style={{ height: 0.53 * height, width, marginBottom: '3%' }}
        initialRegion={initialRegion}
      >
        <Marker coordinate={{ longitude, latitude }} />
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
        <DescriptionRow leftText="Price: " rightText={street} />
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
  date: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  players: PropTypes.array.isRequired,
  maxPlayers: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  longitude: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired,
};

GameDetailsScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('gameName'),
});

const mapStateToProps = state => ({
  name: state.appState.currentGameDetail.name,
  date: state.appState.currentGameDetail.date,
  street: state.appState.currentGameField.street,
  players: state.appState.currentGameDetail.players,
  maxPlayers: state.appState.currentGameDetail.players_number,
  price: state.appState.currentGameField.price_per_hour,
  longitude: state.appState.currentGameField.longitude,
  latitude: state.appState.currentGameField.latitude,
});

export default connect(mapStateToProps)(GameDetailsScreen);
