import React, { Component, PureComponent } from 'react';
import {
  Easing, Animated, View, Button,
} from 'react-native';
import PropTypes from 'prop-types';

import Info from './Info';
import { PURPLE_APP_TINT } from '../../const/const';

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
    animatedValue: new Animated.Value(0.0),
    buttonDisabled: true,
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
    const { animatedValue } = this.state;
    const { visible } = this.props;
    Animated.timing(animatedValue, {
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
    const { animatedValue, buttonDisabled } = this.state;
    return (
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: animatedValue,
        }}
      >
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
