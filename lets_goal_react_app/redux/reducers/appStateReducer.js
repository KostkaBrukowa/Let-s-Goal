import caseConverter from 'case-converter';
import {
  SHOW_GAME_INFO,
  USER_DETAILS,
  FETCHING_USER_DETAILS_FAILED,
  FETCHING_USER_DETAILS,
  LOCATION,
  CLEAR_ERROR,
} from '../actions/types';
import { uniqueObjects } from '../../const/commonForReducers';

const defaultState = {
  currentGameDetail: null,
  currentGameField: null,
  users: [],
  fetchingUserDetails: false,
  fetchingError: null,
  location: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SHOW_GAME_INFO:
      return {
        ...state,
        currentGameField: action.payload.field,
        currentGameDetail: action.payload.game,
      };
    case USER_DETAILS: {
      const user = caseConverter.toCamelCase(action.payload);
      return {
        ...state,
        users: uniqueObjects([...state.users, user], 'id'),
        fetchingUserDetails: false,
      };
    }
    case FETCHING_USER_DETAILS:
      return {
        ...state,
        fetchingUserDetails: true,
      };
    case FETCHING_USER_DETAILS_FAILED:
      return {
        ...state,
        fetchingUserDetails: false,
        fetchingError: new String(action.payload),
      };
    case LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        fetchingError: null,
      };
    default:
      return state;
  }
}
