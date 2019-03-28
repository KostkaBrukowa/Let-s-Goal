import {
  JOINING_GAME,
  JOIN_GAME_FAIL,
  JOIN_GAME_SUCCESS,
  REMOVING_PLAYER,
  REMOVE_PLAYER_FAIL,
  REMOVE_PLAYER_SUCCESS,
  REMOVING_GAME,
  REMOVE_GAME_FAIL,
  REMOVE_GAME_SUCCESS,
  SIGN_OUT,
} from '../actions/types';

const defaultState = {
  removingGame: false,
  joiningGame: false,
  removingPlayer: false,
  removeErrors: null,
  joinErrors: null,
  removeGameError: null,
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
    case REMOVING_GAME:
      return {
        ...state,
        isRemovingGame: true,
      };
    case REMOVE_GAME_SUCCESS:
      return {
        ...state,
        isRemovingGame: false,
      };
    case REMOVE_GAME_FAIL:
      return {
        ...state,
        isRemovingGame: false,
        removeGameError: new String(action.payload),
      };
    case SIGN_OUT:
      return defaultState;
    default:
      return state;
  }
}
