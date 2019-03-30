// TODO CHECK USERNAME WTF
import React, { Component } from 'react';
import {
  View, ToastAndroid, Image, StyleSheet, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'react-navigation';

import { getUserDetails } from '../redux/actions/appStateActions';
import { signOut } from '../redux/actions/authActions';
import FullScreenActivityIndicator from '../components/userDetails/FullScreenActivityIndicator';
import BackgroundImage from '../components/common/BackgroundImage';
import DescriptionRow from '../components/gameDetails/DescriptionRow';
import Title from '../components/gameDetails/Title';
import appStyle from '../const/appStyles';
import GamesCountRow from '../components/userDetails/GamesCount';
import EditButton from '../components/userDetails/EditButton';
import VectorImageButton from '../components/common/VectorImageButton';
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 14,
    marginBottom: '13%',
  },
  button: {
    width: 100,
    marginTop: 5,
  },
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
    // redux actions
    fetchingUserDetails: PropTypes.bool.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    // redux state
    user: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    fetchingError: PropTypes.instanceOf(String),
    username: PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    const { navigation, getUserDetails } = this.props;
    const userId = navigation.getParam('userId');
    if (userId) getUserDetails(userId);
  };

  componentDidUpdate = (prevProps) => {
    const { navigation, user } = this.props;
    // handle the case of two simultaneous screens
    const userId = navigation.getParam('userId');
    if (user && this.props.user.id !== userId) return;

    const { user: prevUser } = prevProps;
    if (user !== prevUser) {
      const { username, signOut } = this.props;

      const isCurrentUser = user && username === user.username;
      const title = isCurrentUser ? 'Your profile' : user.username;
      navigation.setParams({ title, isCurrentUser, signOut });
      this.setState({ user });
    }

    const { fetchingError } = this.props;
    const { fetchingError: prevFetchingError } = prevProps;
    if (fetchingError !== prevFetchingError) {
      ToastAndroid.show('Could not connect to a sever', ToastAndroid.SHORT);
      navigation.goBack();
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

  renderDescritptionRows = () => {
    const { user } = this.state;
    const labels = ['firstName', 'lastName', 'birthDate', 'email', 'address', 'preferedPosition'];

    // simple 'firstName' ===> 'First name:'
    const labelToInfoText = (label) => {
      const notCapitalized = label.split('').reduce((result, char) => {
        if (char === char.toLowerCase()) return result + char;
        return `${result} ${char.toLowerCase()}`;
      }, '');

      return `${notCapitalized.charAt(0).toUpperCase() + notCapitalized.slice(1)}:`;
    };

    const rows = labels.map((label, index) => (
      <DescriptionRow
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        leftText={labelToInfoText(label)}
        rightText={`${user[label] || ''}`}
        {...this.editObject(label)}
      />
    ));

    return rows;
  };

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
            {this.renderDescritptionRows()}
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
  loggedUser: state.user,
  username: state.user.username,
  userId: state.user.userId,
});

export default connect(
  mapStateToProps,
  { getUserDetails, signOut },
)(UserDetailsScreen);
