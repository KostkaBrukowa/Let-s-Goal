import { LOG_IN_SUCCESS } from '../actions/types';

const defaultState = {
  username: null,
  isUserLogged: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isUserLogged: true,
      };
    default:
      return state;
  }
}
