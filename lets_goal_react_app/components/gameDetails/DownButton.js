import React from 'react';
import { Button, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { joinGame, removePlayerFromGame } from '../../redux/actions/gameManagerActions';
import { PURPLE_APP_TINT } from '../../const/const';

function DownButton(props) {
  const { joiningGame, removingPlayer } = props;

  if (joiningGame || removingPlayer) {
    return <ActivityIndicator size={46} color="white" />;
  }

  const {
    userId, players, owner, buttonStyle,
  } = props;
  const isInGame = players.findIndex(u => u === userId) !== -1;
  const isOwner = userId === owner;

  let title;
  let onPress;
  if (isOwner) {
    // const {removePlayerFromGame} = props
    title = 'Remove the game';
    onPress = () => console.log('removing game');
  } else if (isInGame) {
    const { removePlayerFromGame, username } = props;
    title = 'Leave the game';
    onPress = () => removePlayerFromGame(username);
  } else {
    title = 'Join the game';
    onPress = props.joinGame;
  }
  return (
    <View style={buttonStyle}>
      <Button {...props} title={title} onPress={onPress} color={PURPLE_APP_TINT} />
    </View>
  );
}

DownButton.propTypes = {
  // props
  players: PropTypes.array.isRequired,
  owner: PropTypes.number.isRequired,
  buttonStyle: PropTypes.object,
  // redux state
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  joiningGame: PropTypes.func.isRequired,
  removingPlayer: PropTypes.func.isRequired,
  // redux actions
  removePlayerFromGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,,
};
DownButton.defaultProps = {
  buttonStyle: {},
};

const mapStateToProps = state => ({
  joiningGame: state.gameManager.joiningGame,
  joinErrors: state.gameManager.joiningGame,
  removingPlayer: state.gameManager.removingPlayer,
  removeErrors: state.gameManager.removeErrors,
  userId: state.user.userId,
  usernname: state.user.username,
});
const mapDispatchToProps = {
  joinGame,
  removePlayerFromGame,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DownButton);
