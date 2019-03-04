import { LOG_IN_SUCCESS, LOG_IN_FAIL, AUTHENTICATING_USER } from '../actions/types';

const defaultState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isBeingAutheticated: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isBeingAutheticated: false,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isBeingAutheticated: false,
      };
    case AUTHENTICATING_USER:
      return {
        ...state,
        isBeingAutheticated: true,
      };
    default:
      return state;
  }
}
