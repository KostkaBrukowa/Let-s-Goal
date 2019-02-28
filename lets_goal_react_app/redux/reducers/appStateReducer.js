import { SHOW_GAME_INFO } from '../actions/types';

const defaultState = {
  currentGameDetail: null,
  currentGameField: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SHOW_GAME_INFO:
      return {
        ...state,
        currentGameField: action.payload.field,
        currentGameDetail: action.payload.game,
      };
    default:
      return state;
  }
}
