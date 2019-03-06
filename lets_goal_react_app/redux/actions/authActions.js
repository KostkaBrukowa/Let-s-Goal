/* eslint-disable import/prefer-default-export */
import { LOG_IN_SUCCESS, AUTHENTICATING_USER, LOG_IN_FAIL } from './types';

const BASE_URL = 'http://10.0.2.2:8000/';

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: AUTHENTICATING_USER });
  try {
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    const response = await fetch(`${BASE_URL}accounts/get_token/`, options);
    if (!response.ok) {
      if (response.status === 400) {
        dispatch({ type: LOG_IN_FAIL });
      } else {
        const text = await response.text();
        console.log(text);
      }
      return;
    }

    const { user_id: userId, email, token } = await response.json();

    const user = { userId, email, username };

    dispatch({ type: LOG_IN_SUCCESS, payload: { user, token } });
  } catch (e) {
    console.log(e);
  }
};
