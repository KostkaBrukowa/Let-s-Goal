/* eslint-disable no-undef */
import gameAPIReducer from '../redux/reducers/gameAPIReducer';
import {
  NEW_GAME_FORM_SUBIMT_SUCCESS,
  LIST_USERS_GAMES,
  LIST_NEAR_GAMES,
} from '../redux/actions/types';

describe('Testing Game form reducer', () => {
  it('returns previous state when NEW_GAME_FORM_SUBIMT_SUCCESS sent', () => {
    const state = { nearGames: [], usersGames: [] };
    const newGame = { name: 'New game' };
    const reducedState = gameAPIReducer(state, {
      type: NEW_GAME_FORM_SUBIMT_SUCCESS,
      payload: newGame,
    });
    expect(reducedState).toEqual({ ...state, usersGames: [newGame] });
  });

  it('replaces users games when LIST_USERS_GAMES sent', () => {
    const state = {
      nearGames: ['game3', 'game4'],
      usersGames: ['game5', 'game6'],
    };

    const reducedState = gameAPIReducer(state, {
      type: LIST_USERS_GAMES,
      payload: ['game1', 'game2'],
    });
    expect(reducedState).toEqual({
      nearGames: ['game3', 'game4'],
      usersGames: ['game1', 'game2'],
    });
  });

  it('replaces near games when LIST_NEAR_GAMES sent', () => {
    const state = {
      nearGames: ['game3', 'game4'],
      usersGames: ['game5', 'game6'],
    };

    const reducedState = gameAPIReducer(state, {
      type: LIST_NEAR_GAMES,
      payload: ['game1', 'game2'],
    });
    expect(reducedState).toEqual({
      nearGames: ['game1', 'game2'],
      usersGames: ['game5', 'game6'],
    });
  });
});
