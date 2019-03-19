/* eslint-disable no-undef */
import caseConverter from 'case-converter';
import {
  LIST_GAMES,
  LIST_USERS_GAMES_FAIL,
  LIST_NEAR_GAMES,
  LIST_NEAR_GAMES_FAIL,
  LIST_FIELDS,
  FETCHING_USERS_GAMES,
  FETCHING_NEAR_GAMES,
} from './types';
import { tokenConfig } from './authActions';
import { timeout, BASE_URL } from '../../const/commonForActions';

export const fetchNearFields = ({ longitude, latitude }) => async (dispatch, getState) => {
  try {
    const trim = x => x.toFixed(6); // django needs max 9 numbers
    const url = `${BASE_URL}fields/get_near_fields/?latitude=${trim(latitude)}&longitude=${trim(
      longitude,
    )}`;

    const response = await timeout(10000, fetch(url, tokenConfig(getState)));

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }

    const { near_fields: nearFields } = await response.json();

    dispatch({ type: LIST_FIELDS, payload: nearFields });
  } catch (e) {
    dispatch({ type: LIST_NEAR_GAMES_FAIL, payload: e.message });
  }
};

export const fetchUserGames = username => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCHING_USERS_GAMES });
    const url = `${BASE_URL}games/get_users_games/?username=${username}`;

    const response = await timeout(10000, fetch(url, tokenConfig(getState)));
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }

    const { users_games: usersGames } = await response.json();

    dispatch({ type: LIST_FIELDS, payload: usersGames.map(g => g.playing_field) });
    dispatch({ type: LIST_GAMES, payload: usersGames.map(g => g.game) });
  } catch (e) {
    dispatch({ type: LIST_USERS_GAMES_FAIL, payload: e.message });
  }
};

export const fetchNearGames = ({ longitude, latitude }) => async (dispatch, getState) => {
  dispatch({ type: FETCHING_NEAR_GAMES });
  try {
    const trim = x => x.toFixed(6); // django needs max 9 numbers
    const url = `${BASE_URL}games/get_near_games/?latitude=${trim(latitude)}&longitude=${trim(
      longitude,
    )}`;

    const response = await fetch(url, tokenConfig(getState));

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }

    const { near_games: nearGames } = await response.json();

    dispatch({ type: LIST_FIELDS, payload: nearGames.map(g => g.playing_field) });
    dispatch({ type: LIST_NEAR_GAMES, payload: nearGames.map(g => g.game) });
  } catch (e) {
    dispatch({ type: LIST_NEAR_GAMES_FAIL, payload: e.message });
  }
};
