/* eslint-disable import/prefer-default-export */
import {
  LOG_IN_SUCCESS, AUTHENTICATING_USER, LOG_IN_FAIL, REGISTER_FAIL,
} from './types';

const BASE_URL = 'http://10.0.2.2:8000/';
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
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
    console.log('logging in');
    await sleep(1000); // only for debugging

    if (!response.ok) {
      if (response.status === 400) {
        console.log('400');
        dispatch({ type: LOG_IN_FAIL, payload: 'Wrong username or password' });
      } else {
        throw new Error('');
      }
      return;
    }

    const { token } = await response.json();

    dispatch({ type: LOG_IN_SUCCESS, payload: { token, username } });
  } catch (e) {
    dispatch({ type: LOG_IN_FAIL, payload: 'There was a problem with connecting with a server' });
    console.log(e);
  }
};

export const register = ({
  username, email, password1, password2,
}) => async (dispatch) => {
  dispatch({ type: AUTHENTICATING_USER });
  try {
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password1,
        password2,
      }),
    };

    const response = await timeout(
      3000,
      fetch(`${BASE_URL}accounts/rest_auth/registration/`, options),
    );
    await sleep(1000);

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        console.log(data);
        dispatch({ type: REGISTER_FAIL, payload: data });
      } else {
        const text = await response.text();
        console.log(text);
      }
      return;
    }

    dispatch({ type: LOG_IN_SUCCESS, payload: { token: data.token, username } });
  } catch (e) {
    dispatch({
      type: REGISTER_FAIL,
      payload: [{ non_field_errors: 'There was a problem with connecting to a server' }],
    });
    console.log(e);
  }
};

export const tokenConfig = (getState) => {
  const { token } = getState().auth.token;
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
