import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'react-navigation';

import { getUserDetails } from '../redux/actions/appStateActions';
import { PURPLE_APP_TINT } from '../const/const';
import FullScreenActivityIndicator from '../components/userDetails/FullScreenActivityIndicator';
import BackgroundImage from '../components/BackgroundImage';
import DescriptionRow from '../components/gameDetails/DescriptionRow';
import Title from '../components/gameDetails/Title';
import appStyle from '../const/globalStyles';
import GamesCountRow from '../components/userDetails/GamesCount';

const profileImageSide = 170;

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: profileImageSide / 2,
    width: profileImageSide,
    height: profileImageSide,
  },
  titleStyle: {
    marginTop: 7,
  },
  upperContainer: {
    ...appStyle.container,
    flex: 11,
  },
  lowerContainer: {
    ...appStyle.container,
    flex: 10,
    justifyContent: 'space-evenly',
    marginBottom: '13%',
  },
  button: { width: 100, marginTop: 5 },
});

class UserDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const username = navigation.getParam('username');

    return {
      title: username || '',
    };
  };

  state = {
    user: null,
    editMode: false,
    animatedValue: new Animated.Value(0),
  };

  static propTypes = {
    fetchingUserDetails: PropTypes.bool.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    const { navigation, getUserDetails } = this.props;
    const userId = navigation.getParam('userId');
    if (userId) getUserDetails(userId);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { users } = this.props;
    const { users: prevUsers } = prevProps;
    if (users !== prevUsers) {
      const { navigation } = this.props;
      const userId = navigation.getParam('userId');
      const user = users.find(user => user.id === userId);
      this.setState({ user });
    }
  };

  toggleEditMode = () => {
    const { animatedValue, editMode } = this.state;
    Animated.timing(animatedValue, {
      toValue: editMode ? 0 : 1,
      duration: 300,
    }).start(() => {
      this.setState({ editMode: !editMode });
    });
  };

  render() {
    const { fetchingUserDetails } = this.props;
    const { user, animatedValue, editMode } = this.state;
    const height = Dimensions.get('screen').height - 2 * Header.HEIGHT;

    const profileImage = require('../assets/images/no-image-profile.png');
    const upperFlex = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [11, 4],
    });
    const upperOpacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.15],
    });

    if (fetchingUserDetails || !user) {
      return (
        <BackgroundImage dim>
          <FullScreenActivityIndicator color="white" />
        </BackgroundImage>
      );
    }
    return (
      <BackgroundImage dim>
        <View style={[{ height, width: '100%' }, appStyle.container]}>
          <Animated.View
            style={[styles.upperContainer, { flex: upperFlex, opacity: upperOpacity }]}
          >
            <Image style={styles.profileImage} source={profileImage} />
            <Title title={user.username} containerStyle={styles.titleStyle} />
            <GamesCountRow
              descriptionLeft="created games"
              countLeft={user.created_events_number}
              descriptionRight="joined games"
              countRight={user.joined_events_number}
            />
          </Animated.View>
          <KeyboardAvoidingView
            style={[styles.lowerContainer]}
            behavior="padding"
            enabled={editMode}
          >
            <Title title="Profile details" containerStyle={styles.titleStyle} />
            <DescriptionRow
              leftText="First and last name:"
              rightText={`${user.first_name || ''} ${user.last_name || ''}`}
            />
            <DescriptionRow leftText="Birth Date:" rightText={user.birth_date || ''} />
            <DescriptionRow leftText="E-mail address:" rightText={user.email || ''} />
            <DescriptionRow leftText="Address:" rightText={user.address || ''} />
            <DescriptionRow leftText="Prefered position:" rightText={user.prefered_position} />
            <View style={styles.button}>
              <Button
                title={editMode ? 'Save' : 'Edit'}
                onPress={() => {
                  this.toggleEditMode();
                }}
                color={PURPLE_APP_TINT}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </BackgroundImage>
    );
  }
}

const mapStateToProps = state => ({
  users: state.appState.users,
  fetchingUserDetails: state.appState.fetchingUserDetails,
});

export default connect(
  mapStateToProps,
  { getUserDetails },
)(UserDetailsScreen);
