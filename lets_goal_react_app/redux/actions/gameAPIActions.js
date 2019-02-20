/* eslint-disable no-undef */
import {
  SAVE_GAME,
  LIST_USERS_GAMES,
  LIST_NEAR_GAMES,
  LIST_NEAR_FIELDS,
  NEW_GAME_FORM_SUBIMT_SUCCESS,
  NEW_GAME_FORM_FAIL,
} from './types';

const BASE_URL = 'http://10.0.2.2:8000/';

// eslint-disable-next-line import/prefer-default-export
export const saveGame = ({
  name, playersNumber, playingField, date,
}) => async (dispatch) => {
  try {
    const urlFriendlyData = {
      name,
      players_number: playersNumber,
      playing_field: playingField,
      date,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(urlFriendlyData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${BASE_URL}games/`, options);

    if (!response.ok) {
      const text = await response.text();
      dispatch({ type: NEW_GAME_FORM_FAIL, payload: text });
    }

    const newGame = await response.json();

    dispatch({ type: NEW_GAME_FORM_SUBIMT_SUCCESS, payload: newGame });
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchNearFields = ({ longitude, latitude }) => async (dispatch) => {
  try {
    const trim = x => x.toFixed(6); // django needs max 9 numbers

    const response = await fetch(
      `${BASE_URL}fields/get_near_fields/?latitude=${trim(latitude)}&longitude=${trim(longitude)}`,
    );

    if (!response.ok) {
      const errorMsg = await response.text();
      console.log(errorMsg);
    }

    const { near_fields: nearFields } = await response.json();

    dispatch({ type: LIST_NEAR_FIELDS, payload: nearFields });
  } catch (e) {
    console.log(e);
  }

  // dispatch({ type: LIST_NEAR_FIELDS, payload: [field] });
};