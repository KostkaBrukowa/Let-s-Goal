import {
  SAVE_GAME,
  LIST_USERS_GAMES,
  LIST_NEAR_GAMES,
  NEW_GAME_FORM_SUBIMT_SUCCESS,
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
    console.log(urlFriendlyData);
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
      throw text;
    }

    const newGame = await response.json();

    dispatch({ type: NEW_GAME_FORM_SUBIMT_SUCCESS, payload: newGame });
  } catch (e) {
    console.log(e);
  }
};
