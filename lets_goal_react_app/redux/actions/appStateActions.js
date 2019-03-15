import {
  SHOW_GAME_INFO, USER_DETAILS, OTHER_USER_DETAILS, FETCHING_USER_DETAILS,
} from './types';
import { tokenConfig } from './authActions';
import { BASE_URL } from '../../const/commonForActions';

export const showGame = (game, field) => ({ type: SHOW_GAME_INFO, payload: { game, field } });

export const getUserDetails = userId => async (dispatch, getState) => {
  dispatch({ type: FETCHING_USER_DETAILS });
  try {
    const url = `${BASE_URL}accounts/details/${userId}/`;

    const response = await fetch(url, tokenConfig(getState));

    if (!response.ok) {
      const text = await response.text();
      console.log(text);
      return;
    }

    const user = await response.json();
    dispatch({ type: USER_DETAILS, payload: user });
  } catch (e) {
    dispatch({ type: USER_DETAILS, payload: null });
    console.log(e);
  }
};
