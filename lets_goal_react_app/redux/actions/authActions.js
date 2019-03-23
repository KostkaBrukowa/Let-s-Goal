/* eslint-disable import/prefer-default-export */
import {
  LOG_IN_SUCCESS, AUTHENTICATING_USER, LOG_IN_FAIL, REGISTER_FAIL, SIGN_OUT,
} from './types';
import { BASE_URL, timeout } from '../../const/commonForActions';
import NavigationService from '../../navigators/NavigationService';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

    const response = await timeout(3000, fetch(`${BASE_URL}accounts/rest_auth/login/`, options));

    if (!response.ok) {
      if (response.status === 400) {
        dispatch({ type: LOG_IN_FAIL, payload: 'Wrong username or password' });
      } else {
        throw new Error('Non 400 status code');
      }
      return;
    }

    const { key: token, user_id: userId } = await response.json();

    dispatch({ type: LOG_IN_SUCCESS, payload: { token, username, userId } });
  } catch (e) {
    dispatch({ type: LOG_IN_FAIL, payload: 'There was a problem with connecting with a server' });
    console.log(e);
  }
};

export const register = user => async (dispatch) => {
  dispatch({ type: AUTHENTICATING_USER });
  try {
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const response = await timeout(
      3000,
      fetch(`${BASE_URL}accounts/rest_auth/registration/`, options),
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        dispatch({ type: REGISTER_FAIL, payload: data });
      } else {
        const text = await response.text();
        throw new Error(text);
      }
      return;
    }

    dispatch({ type: LOG_IN_SUCCESS, payload: { token: data.token, username: user.username } });
    // dispatch({ type: LOG_IN_SUCCESS });
  } catch (e) {
    dispatch({
      type: REGISTER_FAIL,
      payload: [{ non_field_errors: 'There was a problem with connecting to a server' }],
    });
    console.log(e);
  }
};

export const signOut = () => {
  NavigationService.navigate('loginScreen');
  return dispatch => dispatch({ type: SIGN_OUT });
};

export const tokenConfig = (getState) => {
  const { token } = getState().user;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    options.headers.Authorization = `Token ${token}`;
  }
  return options;
};
