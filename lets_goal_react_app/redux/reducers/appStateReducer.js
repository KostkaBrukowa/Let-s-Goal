import caseConverter from 'case-converter';
import {
  SHOW_GAME_INFO,
  USER_DETAILS,
  FETCHING_USER_DETAILS_FAILED,
  FETCHING_USER_DETAILS,
  LOCATION,
  UPDATE_USER_DETAIL_FAIL,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATING_USER_DETAILS,
  SIGN_OUT,
} from '../actions/types';

const defaultState = {
  currentGameDetail: null,
  currentGameField: null,
  userDetails: null,
  fetchingUserDetails: false,
  fetchingError: null,
  updatingUserDetails: false,
  updatingUserDetailsError: null,
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
        userDetails: user,
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
    case UPDATING_USER_DETAILS:
      return {
        ...state,
        updatingUserDetails: true,
        updatingUserDetailsError: null,
      };
    case UPDATE_USER_DETAIL_SUCCESS:
      return {
        ...state,
        updatingUserDetails: false,
        updatingUserDetailsError: null,
      };
    case UPDATE_USER_DETAIL_FAIL:
      return {
        ...state,
        updatingUserDetails: false,
        updatingUserDetailsError: action.payload,
      };
    case SIGN_OUT:
      return defaultState;

    default:
      return state;
  }
}
