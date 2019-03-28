import React, { Component } from 'react';
import {
  View, ToastAndroid, Image, StyleSheet, Dimensions, Animated, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'react-navigation';

import { getUserDetails } from '../redux/actions/appStateActions';
import { signOut } from '../redux/actions/authActions';
import FullScreenActivityIndicator from '../components/userDetails/FullScreenActivityIndicator';
import BackgroundImage from '../components/BackgroundImage';
import DescriptionRow from '../components/gameDetails/DescriptionRow';
import Title from '../components/gameDetails/Title';
import appStyle from '../const/globalStyles';
import GamesCountRow from '../components/userDetails/GamesCount';
import EditButton from '../components/userDetails/EditButton';
import VectorImageButton from '../components/ImageButton';
import OnOfTransformView from '../components/userDetails/OnOfTransformView';

const profileImageSide = 170;
const animationDuration = 600;

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
    flex: 14,
    justifyContent: 'space-evenly',
    marginBottom: '13%',
  },
  button: { width: 100, marginTop: 5 },
});

class UserDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title');
    const isCurrentUser = navigation.getParam('isCurrentUser');
    const signOut = navigation.getParam('signOut');

    const headerRight = isCurrentUser && (
      <VectorImageButton iconName="sign-out" onPress={signOut} />
    );

    return {
      title: title || '',
      headerRight,
    };
  };

  state = {
    user: null,
    editMode: false,
    positionFlipped: false,
  };

  static propTypes = {
    fetchingUserDetails: PropTypes.bool.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    user: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    fetchingError: PropTypes.instanceOf(String),
    username: PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    const { navigation, getUserDetails } = this.props;
    const userId = navigation.getParam('userId');
    // debugger;
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

    const { user } = this.props;
    const { user: prevUser } = prevProps;
    if (user !== prevUser) {
      const { navigation, username, signOut } = this.props;
      const userId = navigation.getParam('userId');
      if (user.id !== userId) return;

      const isCurrentUser = user && username === user.username;
      const title = isCurrentUser ? 'Your profile' : user.username;
      navigation.setParams({ title, isCurrentUser, signOut });
      this.setState({ user });
    }
  };

  toggleEditMode = () => {
    this.setState(state => ({ positionFlipped: !state.positionFlipped }));
    setTimeout(
      () => this.setState(state => ({ editMode: !state.editMode })),
      animationDuration + 100,
    );
  };

  editObject = fieldName => ({
    editMode: this.state.editMode,
    onChangeText: value => this.setState(state => ({
      user: {
        ...state.user,
        [fieldName]: value,
      },
    })),
  });

  render() {
    const { fetchingUserDetails, username } = this.props;
    const { user, editMode, positionFlipped } = this.state;
    const { height: screenHeight } = Dimensions.get('screen');
    const height = screenHeight - 2 * Header.HEIGHT;

    const profileImage = require('../assets/images/no-image-profile.png');
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
          <OnOfTransformView
            transformOn={positionFlipped}
            transformRange={[{ translateY: [0, 0.32 * screenHeight] }]}
            opacity={[1, 0.15]}
            duration={animationDuration}
            style={styles.upperContainer}
          >
            <Image style={styles.profileImage} source={profileImage} />
            <Title title={user.username} containerStyle={styles.titleStyle} />
            <GamesCountRow
              descriptionLeft="created games"
              countLeft={user.createdEventsNumber}
              descriptionRight="joined games"
              countRight={user.joinedEventsNumber}
            />
          </OnOfTransformView>
          <OnOfTransformView
            transformOn={positionFlipped}
            transformRange={[
              { translateY: [0, -0.32 * screenHeight] },
              { scaleX: [1, 1.08] },
              { scaleY: [1, 1.08] },
            ]}
            duration={animationDuration}
            style={styles.lowerContainer}
          >
            <Title title="Profile details" containerStyle={styles.titleStyle} />
            <DescriptionRow
              leftText="First name:"
              rightText={`${user.firstName || ''}`}
              {...this.editObject('firstName')}
            />
            <DescriptionRow
              leftText="Last name:"
              rightText={`${user.lastName || ''}`}
              {...this.editObject('lastName')}
            />
            <DescriptionRow
              leftText="Birth Date:"
              rightText={user.birthDate || ''}
              {...this.editObject('birthDate')}
            />
            <DescriptionRow leftText="E-mail address:" rightText={user.email || ''} />
            <DescriptionRow
              leftText="Address:"
              rightText={user.address || ''}
              {...this.editObject('address')}
            />
            <DescriptionRow
              leftText="Prefered position:"
              rightText={user.preferedPosition}
              {...this.editObject('preferedPosition')}
            />
            <EditButton
              editMode={editMode}
              visible={user.username === username}
              onPress={this.toggleEditMode}
            />
          </OnOfTransformView>
        </View>
      </BackgroundImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.appState.userDetails,
  fetchingUserDetails: state.appState.fetchingUserDetails,
  fetchingError: state.appState.fetchingError,
  username: state.user.username,
  userId: state.user.userId,
});

export default connect(
  mapStateToProps,
  { getUserDetails, signOut },
)(UserDetailsScreen);
