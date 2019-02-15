/* eslint-disable no-undef */
import {
  PICK_NAME_SUCCESS,
  PICK_NAME_FAIL,
  PICK_PLAYER_NUMBER_SUCCESS,
  PICK_PLAYER_NUMBER_FAIL,
  PICK_FIELD_SUCCESS,
  PICK_FIELD_FAIL,
  PICK_DATE_SUCCESS,
  PICK_DATE_FAIL,
} from './types';

const BASE_URL = 'http://127.0.0.1:8000/';

export const pickName = name => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}isNameUnique&name=${name}`);
    const { exists } = await response.json();

    if (!exists) dispatch({ type: PICK_NAME_SUCCESS, payload: name });
    else dispatch({ type: PICK_NAME_FAIL, payload: 'There is a game with this name' });
  } catch (e) {
    dispatch({ type: PICK_NAME_FAIL, payload: 'There was a problem with connecting to a server' });
  }
};

export const pickDate = date => (dispatch) => {
  if (date <= Date.now()) dispatch({ type: PICK_DATE_FAIL, payload: 'You cannot pick a day that has already passed' });
  else dispatch({ type: PICK_DATE_SUCCESS, payload: date });
};

export const pickPlayers = playersNumber => (!isNaN(+playersNumber) && playersNumber > 2 && playersNumber < 20
  ? { type: PICK_PLAYER_NUMBER_SUCCESS, payload: playersNumber }
  : { type: PICK_PLAYER_NUMBER_FAIL, payload: 'Wrong number of players' });

export const pickField = field => ({
  type: PICK_FIELD_SUCCESS,
  payload: field,
});
