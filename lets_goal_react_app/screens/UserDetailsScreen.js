import React, { Component } from 'react';
import {
  View,
  ToastAndroid,
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

import { getUserDetails, clearUserDetailFetchError } from '../redux/actions/appStateActions';
import { PURPLE_APP_TINT } from '../const/const';
import FullScreenActivityIndicator from '../components/userDetails/FullScreenActivityIndicator';
import BackgroundImage from '../components/BackgroundImage';
import DescriptionRow from '../components/gameDetails/DescriptionRow';
import Title from '../components/gameDetails/Title';
import appStyle from '../const/globalStyles';
import GamesCountRow from '../components/userDetails/GamesCount';
import NavigationService from '../navigators/NavigationService';
import EditButton from '../components/userDetails/EditButton';

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
    const title = navigation.getParam('title');

    return {
      title: title || '',
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
    fetchingError: PropTypes.instanceOf(String),
    cleanError: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    const { navigation, getUserDetails } = this.props;
    const userId = navigation.getParam('userId');
    if (userId) getUserDetails(userId);
  };

  componentDidUpdate = (prevProps) => {
    const { fetchingError } = this.props;
    const { fetchingError: prevFetchingError } = prevProps;
    if (fetchingError !== prevFetchingError) {
      const { navigation } = this.props;
      ToastAndroid.show('Could not connect to a sever', ToastAndroid.SHORT);
      navigation.goBack();
    }

    const { users } = this.props;
    const { users: prevUsers } = prevProps;
    if (users !== prevUsers) {
      const { navigation, username } = this.props;
      const userId = navigation.getParam('userId');
      const user = users.find(user => user.id === userId);

      const title = username === user.username ? 'Your profile' : user.username;
      navigation.setParams({ title });
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
    const { fetchingUserDetails, username } = this.props;
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
        <BackgroundImage dim stackHeader>
          <FullScreenActivityIndicator color="white" />
        </BackgroundImage>
      );
    }
    return (
      <BackgroundImage dim stackHeader>
        <View style={[{ height, width: '100%' }, appStyle.container]}>
          <Animated.View
            style={[styles.upperContainer, { flex: upperFlex, opacity: upperOpacity }]}
          >
            <Image style={styles.profileImage} source={profileImage} />
            <Title title={user.username} containerStyle={styles.titleStyle} />
            <GamesCountRow
              descriptionLeft="created games"
              countLeft={user.createdEventsNumber}
              descriptionRight="joined games"
              countRight={user.joinedEventsNumber}
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
              rightText={`${user.firstName || ''} ${user.lastName || ''}`}
            />
            <DescriptionRow leftText="Birth Date:" rightText={user.birthDate || ''} />
            <DescriptionRow leftText="E-mail address:" rightText={user.email || ''} />
            <DescriptionRow leftText="Address:" rightText={user.address || ''} />
            <DescriptionRow leftText="Prefered position:" rightText={user.preferedPosition} />
            <EditButton
              editMode={editMode}
              visible={user.username === username}
              onPress={this.toggleEditMode}
            />
          </KeyboardAvoidingView>
        </View>
      </BackgroundImage>
    );
  }
}

const mapStateToProps = state => ({
  users: state.appState.users,
  fetchingUserDetails: state.appState.fetchingUserDetails,
  fetchingError: state.appState.fetchingError,
  username: state.user.username,
});

export default connect(
  mapStateToProps,
  { getUserDetails, cleanError: clearUserDetailFetchError },
)(UserDetailsScreen);
