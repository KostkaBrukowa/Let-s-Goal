import caseConverter from 'case-converter';
import {
  JOINING_GAME,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAIL,
  REMOVING_PLAYER,
  REMOVE_PLAYER_SUCCESS,
  REMOVE_PLAYER_FAIL,
  NEW_GAME_FORM_SUBIMT_SUCCESS,
  NEW_GAME_FORM_FAIL,
  LIST_NEAR_GAMES,
  LIST_USERS_GAMES,
  LIST_GAMES,
} from './types';
import { tokenConfig } from './authActions';
import { timeout, BASE_URL, TimeoutError } from '../../const/commonForActions';

export const saveGame = form => async (dispatch, getState) => {
  try {
    const urlFriendlyData = caseConverter.toSnakeCase(form);
    const options = {
      method: 'POST',
      body: JSON.stringify(urlFriendlyData),
      ...tokenConfig(getState),
    };

    const response = await timeout(10000, fetch(`${BASE_URL}games/`, options));

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const newGame = await response.json();

    dispatch({ type: NEW_GAME_FORM_SUBIMT_SUCCESS });
    dispatch({ type: LIST_GAMES, payload: [newGame] });
  } catch (e) {
    dispatch({ type: NEW_GAME_FORM_FAIL, payload: e.message });
  }
};

export const joinGame = gameId => async (dispatch, getState) => {
  dispatch({ type: JOINING_GAME });
  try {
    const url = `${BASE_URL}games/${gameId}/join_game/`;
    const config = { ...tokenConfig(getState), method: 'PUT' };
    const response = await timeout(10000, fetch(url, config));

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }

    const { game } = await response.json();

    dispatch({ type: JOIN_GAME_SUCCESS });
    dispatch({ type: LIST_GAMES, payload: [game] });
  } catch (e) {
    if (e instanceof TimeoutError) {
      dispatch({ type: JOIN_GAME_FAIL, payload: 'Could not connect to a server' });
    } else dispatch({ type: JOIN_GAME_FAIL, payload: e.message });
    console.log(e.message);
  }
};

export const removePlayerFromGame = (username, gameId) => async (dispatch, getState) => {
  dispatch({ type: REMOVING_PLAYER });
  try {
    const config = { ...tokenConfig(getState), body: JSON.stringify({ username }), method: 'PUT' };
    const url = `${BASE_URL}games/${gameId}/remove_player/`;
    const response = await timeout(10000, fetch(url, config));

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }

    const { game } = await response.json();

    dispatch({ type: REMOVE_PLAYER_SUCCESS });
    dispatch({ type: LIST_GAMES, payload: [game] });
  } catch (e) {
    if (e instanceof TimeoutError) {
      dispatch({ type: REMOVE_PLAYER_FAIL, payload: 'Could not connect to a server' });
    } else dispatch({ type: REMOVE_PLAYER_FAIL, payload: e.message });
    console.log(e.message);
  }
};
