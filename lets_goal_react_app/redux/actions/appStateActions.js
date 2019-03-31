import { Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import caseConverter from 'case-converter';
import {
  CLEAR_ERROR,
  SHOW_GAME_INFO,
  USER_DETAILS,
  FETCHING_USER_DETAILS,
  FETCHING_USER_DETAILS_FAILED,
  UPDATE_USER_DETAIL_FAIL,
  UPDATE_USER_DETAIL_SUCCESS,
  UPDATING_USER_DETAILS,
  LOCATION,
} from './types';
import { tokenConfig } from './authActions';
import { timeout, TimeoutError } from '../../const/commonForActions';
import { BASE_URL } from '../../const/commonForActions';

const defalutLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
};

export const showGame = (game, field) => ({ type: SHOW_GAME_INFO, payload: { game, field } });

export const getUserDetails = userId => async (dispatch, getState) => {
  dispatch({ type: FETCHING_USER_DETAILS });
  try {
    const url = `${BASE_URL}accounts/details/${userId}/`;

    const response = await timeout(10000, fetch(url, tokenConfig(getState)));

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const user = await response.json();
    dispatch({ type: USER_DETAILS, payload: user });
  } catch (e) {
    dispatch({ type: FETCHING_USER_DETAILS_FAILED, payload: 'Connection timeout' });
  }
};

export const updateUserDetails = user => async (dispatch, getState) => {
  dispatch({ type: UPDATING_USER_DETAILS });
  try {
    const url = `${BASE_URL}accounts/details/${user.id}/`;
    const config = {
      ...tokenConfig(getState),
      method: 'PUT',
      body: JSON.stringify(caseConverter.toSnakeCase(user)),
    };

    console.log(caseConverter.toSnakeCase(user));

    const response = await timeout(10000, fetch(url, config));
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }

    const responseUser = await response.json();
    console.log(responseUser);

    dispatch({ type: USER_DETAILS, payload: responseUser });
    dispatch({ type: UPDATE_USER_DETAIL_SUCCESS });
  } catch (e) {
    dispatch({ type: UPDATE_USER_DETAIL_FAIL, payload: e.message });
    console.log(e);
  }
};

export const fetchLocation = () => async (dispatch) => {
  if (Platform.OS === 'android' && !Constants.isDevice) {
    console.log('Locaiton feature does not work on emulators');
    dispatch({ type: LOCATION, payload: defalutLocation });
    return;
  }
  // dispatch({ type: FETCHING_LOCATION });
  try {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    dispatch({ type: LOCATION, payload: location });
  } catch (e) {
    console.log(e.message);
  }
};

export const clearUserDetailFetchError = () => ({
  type: CLEAR_ERROR,
});
