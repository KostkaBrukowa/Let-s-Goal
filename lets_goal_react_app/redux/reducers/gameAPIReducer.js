import { Set, List } from 'immutable';

import {
  NEW_GAME_FORM_SUBIMT_SUCCESS,
  LIST_USERS_GAMES,
  LIST_NEAR_GAMES,
  LIST_NEAR_FIELDS,
  FETCHING_USERS_GAMES,
} from '../actions/types';

// const _uniqueObjects = (array, prop) => {
//   const keyValueArray = array.map(entry => [entry[prop], entry]);
//   const map = new Map(keyValueArray);
//   return Array.from(map.values());
// };

function uniqueObjects(array, propertyName) {
  return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
}
export const apiDefaultState = {
  nearGames: [],
  usersGames: [],
  usersFields: [],
  nearFields: [],
  // isNearGamesFetching: false,
  isUsersGamesFetching: false,
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
      const { usersGames, usersFields } = state;
      return {
        ...state,
        usersGames: uniqueObjects([...usersGames, ...action.payload.map(g => g.game)], 'id'),
        usersFields: uniqueObjects(
          [...usersFields, ...action.payload.map(g => g.playing_field)],
          'id',
        ),
        isUsersGamesFetching: false,
      };
    }
    case LIST_NEAR_GAMES:
      return {
        ...state,
        nearGames: action.payload,
      };

    case LIST_NEAR_FIELDS:
      return {
        ...state,
        nearFields: action.payload,
      };
    default:
      return state;
  }
}
