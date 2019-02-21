import {
  NEW_GAME_FORM_SUBIMT_SUCCESS,
  LIST_USERS_GAMES,
  LIST_NEAR_GAMES,
  LIST_NEAR_FIELDS,
} from '../actions/types';

export const apiDefaultState = {
  nearGames: [],
  usersGames: [],
  nearFields: [],
  // isNearGamesFetching: false,
  // isUsersGamesFetching: false,
};

export default function (state = apiDefaultState, action) {
  switch (action.type) {
    case NEW_GAME_FORM_SUBIMT_SUCCESS:
      return {
        ...state,
        usersGames: [...state.usersGames, action.payload],
      };
    case LIST_USERS_GAMES:
      return {
        ...state,
        usersGames: action.payload,
      };
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
