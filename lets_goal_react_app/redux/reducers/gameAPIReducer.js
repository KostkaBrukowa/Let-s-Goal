import { Set, List } from 'immutable';

import {
  NEW_GAME_FORM_SUBIMT_SUCCESS,
  LIST_USERS_GAMES,
  LIST_NEAR_GAMES,
  LIST_FIELDS,
  FETCHING_USERS_GAMES,
  FETCHING_NEAR_GAMES,
  LIST_USERS_GAMES_FAIL,
  LIST_NEAR_GAMES_FAIL,
} from '../actions/types';

import { uniqueObjects } from '../../const/commonForReducers';

export const apiDefaultState = {
  nearGames: [],
  usersGames: [],
  fields: [],
  isNearGamesFetching: false,
  isUsersGamesFetching: false,
  nearGamesError: null,
  userGamesError: null,
};

export default function (state = apiDefaultState, action) {
  switch (action.type) {
    case NEW_GAME_FORM_SUBIMT_SUCCESS:
      return {
        ...state,
        usersGames: [...state.usersGames, action.payload],
      };
    case FETCHING_USERS_GAMES:
      return {
        ...state,
        isUsersGamesFetching: true,
      };
    case LIST_USERS_GAMES: {
      const { usersGames } = state;
      return {
        ...state,
        usersGames: uniqueObjects([...usersGames, ...action.payload], 'id'),
        isUsersGamesFetching: false,
      };
    }
    case LIST_USERS_GAMES_FAIL:
      return {
        ...state,
        isUsersGamesFetching: false,
        userGamesError: action.payload,
      };

    case FETCHING_NEAR_GAMES:
      return {
        ...state,
        isNearGamesFetching: true,
      };
    case LIST_NEAR_GAMES:
      return {
        ...state,
        nearGames: action.payload,
        isNearGamesFetching: false,
      };
    case LIST_NEAR_GAMES_FAIL:
      return {
        ...state,
        isNearGamesFetching: false,
        nearGamesError: action.payload,
      };

    case LIST_FIELDS: {
      const { fields } = state;
      const parsedFields = action.payload.map(field => ({
        ...field,
        longitude: parseFloat(field.longitude),
        latitude: parseFloat(field.latitude),
      }));
      return {
        ...state,
        fields: uniqueObjects([...fields, ...parsedFields], 'id'),
      };
    }
    default:
      return state;
  }
}
