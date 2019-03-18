import {
  JOINING_GAME,
  JOIN_GAME_FAIL,
  JOIN_GAME_SUCCESS,
  REMOVING_PLAYER,
  REMOVE_PLAYER_FAIL,
  REMOVE_PLAYER_SUCCESS,
} from '../actions/types';

const defaultState = {
  joiningGame: false,
  joinErrors: null,
  removingPlayer: false,
  removeErrors: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case JOINING_GAME:
      return {
        ...state,
        joiningGame: true,
      };
    case JOIN_GAME_SUCCESS:
      return {
        ...state,
        joiningGame: false,
        joinErrors: null,
      };
    case JOIN_GAME_FAIL:
      return {
        ...state,
        joiningGame: false,
        joinErrors: new String(action.payload),
      };
    case REMOVING_PLAYER:
      return {
        ...state,
        removingPlayer: true,
      };
    case REMOVE_PLAYER_SUCCESS:
      return {
        ...state,
        removingPlayer: false,
        removeErrors: null,
      };
    case REMOVE_PLAYER_FAIL:
      return {
        ...state,
        removingPlayer: false,
        removeErrors: new String(action.payload),
      };
    default:
      return state;
  }
}
