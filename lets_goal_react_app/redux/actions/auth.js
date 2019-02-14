import { LOG_IN_SUCCESS } from './types';

export const login = (username, password) => (dispatch) => {
  dispatch({ type: LOG_IN_SUCCESS, payload: { username } });
};
