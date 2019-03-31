import React, { Component } from 'react';
import {
  Easing, Animated, View, Button, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import Info from './Info';
import { PURPLE_APP_TINT } from '../../const/const';
import appStyle from '../../const/appStyles';

const styles = StyleSheet.create({
  container: {
    ...appStyle.container,
    flex: 1,
  },
});

export default class InfoTile extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    price_per_hour: PropTypes.number.isRequired,
    street: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    currentPlayers: PropTypes.number.isRequired,
    maxPlayers: PropTypes.number.isRequired,
    onButtonPress: PropTypes.func.isRequired,
  };

  state = {
    animatedOpacity: new Animated.Value(0.0),
  };

  shouldComponentUpdate = (nextProps) => {
    const { visible, currentPlayers } = this.props;
    const { visible: nextVisible, currentPlayers: nextCurrentPlayers } = nextProps;
    return visible !== nextVisible || currentPlayers !== nextCurrentPlayers;
  };

  componentDidMount = () => {
    this.setVisibility();
  };

  componentDidUpdate = (prevProps) => {
    const { visible } = this.props;
    const { visible: prevVisible } = prevProps;
    if (visible !== prevVisible) {
      this.setVisibility();
    }
  };

  setVisibility = () => {
    const { animatedOpacity } = this.state;
    const { visible } = this.props;
    Animated.timing(animatedOpacity, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  render() {
    const {
      price_per_hour: price,
      street,
      date,
      currentPlayers,
      maxPlayers,
      onButtonPress,
      visible,
    } = this.props;
    const { animatedOpacity } = this.state;
    return (
      <Animated.View style={[styles.container, { opacity: animatedOpacity }]}>
        <Info text={street} />
        <Info text={date.substring(0, 10).replace(/-/g, '.')} />
        <Info text={`${currentPlayers}/${maxPlayers}`} />
        <Info text={`Price: ${price} USD`} />
        <View style={{ width: 80 }}>
          <Button
            disabled={!visible}
            title="Join"
            color={PURPLE_APP_TINT}
            onPress={onButtonPress}
          />
        </View>
      </Animated.View>
    );
  }
}
