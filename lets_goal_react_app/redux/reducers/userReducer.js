import {
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  AUTHENTICATING_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/types';

const defaultState = {
  username: null,
  token: null,
  isAuthenticated: false,
  isBeingAuthenticated: false,
  loginErrors: {},
  registerErrors: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
        isAuthenticated: true,
        isBeingAuthenticated: false,
        loginErrors: null,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isBeingAuthenticated: false,
        loginErrors: { error: action.payload },
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isBeingAuthenticated: false,
        registerErrors: action.payload,
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
