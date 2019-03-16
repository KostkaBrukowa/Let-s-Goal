import {
  SHOW_GAME_INFO,
  USER_DETAILS,
  OTHER_USER_DETAILS,
  FETCHING_USER_DETAILS,
} from '../actions/types';
import { uniqueObjects } from '../../const/commonForReducers';

const defaultState = {
  currentGameDetail: null,
  currentGameField: null,
  users: [],
  fetchingUserDetails: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SHOW_GAME_INFO:
      return {
        ...state,
        currentGameField: action.payload.field,
        currentGameDetail: action.payload.game,
      };
    case USER_DETAILS:
      return {
        ...state,
        users: uniqueObjects([...state.users, action.payload], 'id'),
        fetchingUserDetails: false,
      };
    case FETCHING_USER_DETAILS:
      return {
        ...state,
        fetchingUserDetails: true,
      };
    default:
      return state;
  }
}
