import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { Constants } from 'expo';

import { login } from '../redux/actions/auth';
import {
  BOTTOM_ICON_SIZE,
  BOTTOM_ICON_COLOR_F,
  BOTTOM_ICON_COLOR_UF,
} from '../const/const';

export const EventsIcon = ({ focused }) => (
  <Icon
    name="md-calendar"
    size={BOTTOM_ICON_SIZE}
    color={focused ? BOTTOM_ICON_COLOR_F : BOTTOM_ICON_COLOR_UF}
  />
);

export class EventsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'My events',
    tabBarIcon: EventsIcon,
    title: 'My events',
  };

  static propTypes = {
    isUserLogged: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
  };

  render() {
    const { isUserLogged, login } = this.props;
    return (
      <View style={{ marginTop: Constants.statusBarHeight }}>
        <Text>
          This is events page and user is
          {isUserLogged ? 'is logged' : 'is not logged'}
        </Text>
        <Button onPress={() => login('mary', 'poppins')} title="login" />
      </View>
    );
  }
}

const mapStateToProps = state => ({ isUserLogged: state.user.isUserLogged });

// export default EventsScreen;

export default connect(
  mapStateToProps,
  { login }
)(EventsScreen);
