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
  NEW_GAME_FORM_FAIL,
} from './types';

const BASE_URL = 'http://10.0.2.2:8000/';

export const pickName = name => async (dispatch) => {
  try {
    if (name.length === 0) {
      dispatch({ type: PICK_NAME_FAIL, payload: 'Name cannot be blank' });
      return;
    }
    console.log(`${BASE_URL}games/is_name_unique/?name=${name}`);
    const response = await fetch(`${BASE_URL}games/is_name_unique/?name=${name}`);

    if (!response.ok) {
      const errorMsg = await response.text();
      dispatch({ type: NEW_GAME_FORM_FAIL, payload: errorMsg });
      return;
    }

    const { exists } = await response.json();
    if (!exists) {
      dispatch({ type: PICK_NAME_SUCCESS, payload: name });
    } else {
      dispatch({ type: PICK_NAME_FAIL, payload: 'There is a game with this name' });
    }
  } catch (e) {
    dispatch({ type: NEW_GAME_FORM_FAIL, payload: e.message });
    console.log(e);
  }
};

export const pickDate = date => (dispatch) => {
  if (date <= Date.now()) {
    dispatch({ type: PICK_DATE_FAIL, payload: 'You cannot pick a day that has already passed' });
  } else dispatch({ type: PICK_DATE_SUCCESS, payload: date });
};

export const pickPlayers = (playersNumber) => {
  if (!isNaN(+playersNumber) && playersNumber > 2 && playersNumber < 20) {
    return { type: PICK_PLAYER_NUMBER_SUCCESS, payload: playersNumber };
  }

  return { type: PICK_PLAYER_NUMBER_FAIL, payload: 'Wrong number of players' };
};

export const pickField = field => ({
  type: PICK_FIELD_SUCCESS,
  payload: field,
});
