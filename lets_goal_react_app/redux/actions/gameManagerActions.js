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
} from './types';
import { tokenConfig } from './authActions';
import { timeout, BASE_URL, TimeoutError } from '../../const/commonForActions';

export const saveGame = form => async (dispatch, getState) => {
  try {
    const urlFriendlyData = caseConverter.toSnakeCase(form);
    const options = {
      method: 'POST',
      //   body: JSON.stringify(urlFriendlyData),
      body: urlFriendlyData,
      ...tokenConfig(getState),
    };

    const response = await timeout(10000, fetch(`${BASE_URL}games/`, options));

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const newGame = await response.json();

    dispatch({ type: NEW_GAME_FORM_SUBIMT_SUCCESS, payload: newGame });
  } catch (e) {
    dispatch({ type: NEW_GAME_FORM_FAIL, payload: e.message });
  }
};

export const joinGame = () => async (dispatch, getState) => {
  dispatch({ type: JOINING_GAME });
  try {
    const url = `${BASE_URL}games/join_game/`;
    const response = await timeout(10000, fetch(url, tokenConfig(getState)));

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }

    dispatch({ type: JOIN_GAME_SUCCESS });
  } catch (e) {
    if (e instanceof TimeoutError) {
      dispatch({ type: JOIN_GAME_FAIL, payload: 'Could not connect to a server' });
    } else dispatch({ type: JOIN_GAME_FAIL, payload: e.message });
  }
};

export const removePlayerFromGame = username => async (dispatch, getState) => {
  dispatch({ type: REMOVING_PLAYER });
  try {
    const config = { ...tokenConfig(getState), username };
    const url = `${BASE_URL}/games/remove_player/`;
    const response = await timeout(10000, fetch(url, config));

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }

    dispatch({ type: REMOVE_PLAYER_SUCCESS });
  } catch (e) {
    if (e instanceof TimeoutError) {
      dispatch({ type: REMOVE_PLAYER_FAIL, payload: 'Could not connect to a server' });
    } else dispatch({ type: REMOVE_PLAYER_FAIL, payload: e.message });
  }
};