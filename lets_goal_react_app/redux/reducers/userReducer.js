import {
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  AUTHENTICATING_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_DETAILS,
  SIGN_OUT,
} from '../actions/types';

// username: null,
// token: null,
// userId: null,
// token: action.payload.token,
// username: action.payload.username,
// userId: action.payload.userId,
const defaultState = {
  username: 'Mark',
  token: '362f17711de6c953fe126e8bf5276c566003ae2b',
  userId: 2,
  isAuthenticated: false,
  isBeingAuthenticated: false,
  loginErrors: null,
  registerErrors: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        userId: action.payload.userId,
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
    case SIGN_OUT:
      return defaultState;
    default:
      return state;
  }
}
