import React from 'react';
import { Button, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { joinGame, removePlayerFromGame, removeGame } from '../../redux/actions/gameManagerActions';
import { PURPLE_APP_TINT } from '../../const/const';

function DownButton(props) {
  const {
    joiningGame, removingPlayer, gameId, removingGame,
  } = props;

  if (joiningGame || removingPlayer || removingGame) {
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
    const { removeGame } = props;
    title = 'Remove the game';
    onPress = () => removeGame(gameId);
  } else if (isInGame) {
    const { removePlayerFromGame, username } = props;
    title = 'Leave the game';
    onPress = () => removePlayerFromGame(username, gameId);
  } else {
    title = 'Join the game';
    onPress = () => props.joinGame(gameId);
  }
  return (
    <View style={buttonStyle}>
      <Button title={title} onPress={onPress} color={PURPLE_APP_TINT} />
      {/* <Button {...props} title={title} onPress={onPress} color={PURPLE_APP_TINT} /> */}
    </View>
  );
}

DownButton.propTypes = {
  // props
  players: PropTypes.array.isRequired,
  owner: PropTypes.number.isRequired,
  buttonStyle: PropTypes.object,
  gameId: PropTypes.number.isRequired,
  // redux state
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  joiningGame: PropTypes.bool.isRequired,
  removingPlayer: PropTypes.bool.isRequired,
  removingGame: PropTypes.bool.isRequired,
  // redux actions
  removePlayerFromGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
  removeGame: PropTypes.func.isRequired,
};
DownButton.defaultProps = {
  buttonStyle: {},
};

const mapStateToProps = state => ({
  joiningGame: state.gameManager.joiningGame,
  joinErrors: state.gameManager.joiningGame,
  removingGame: state.gameManager.removingGame,
  removingPlayer: state.gameManager.removingPlayer,
  removeErrors: state.gameManager.removeErrors,
  userId: state.user.userId,
  username: state.user.username,
});
const mapDispatchToProps = {
  joinGame,
  removePlayerFromGame,
  removeGame,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DownButton);
