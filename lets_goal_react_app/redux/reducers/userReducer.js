import { LOG_IN_SUCCESS, LOG_IN_FAIL, AUTHENTICATING_USER } from '../actions/types';

const defaultState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isBeingAuthenticated: false,
  loginFailed: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isBeingAuthenticated: false,
        loginFailed: false,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isBeingAuthenticated: false,
        loginFailed: true,
      };
    case AUTHENTICATING_USER:
      return {
        ...state,
        isBeingAuthenticated: true,
      };
    default:
      return state;
  }
}
