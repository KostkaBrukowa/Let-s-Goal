import {
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  AUTHENTICATING_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_DETAILS,
} from '../actions/types';

const defaultState = {
  token: '6dd0f3e70b8c1c77209bf844276cd43464cb3b25',
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
