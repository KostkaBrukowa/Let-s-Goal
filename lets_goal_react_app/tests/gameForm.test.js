/* eslint-disable no-undef */
import gameFormReducer, { formInitialState } from '../redux/reducers/gameFormReducer';
import {
  PICK_NAME_SUCCESS,
  PICK_NAME_FAIL,
  NEW_GAME_FORM_SUBIMT_SUCCESS,
} from '../redux/actions/types';

describe('Testing Game form reducer', () => {
  it('updates a value when sent a success', () => {
    const state = {
      name: {
        value: null,
        errors: null,
      },
    };

    const reducedState = gameFormReducer(state, {
      type: NEW_GAME_FORM_SUBIMT_SUCCESS,
      payload: 'game1',
    });
    expect(reducedState).toEqual(formInitialState);
  });

  it('updates a value when sent a success', () => {
    const reducedState = gameFormReducer(undefined, { type: PICK_NAME_SUCCESS, payload: 'game1' });
    expect(reducedState).toEqual({
      ...formInitialState,
      name: {
        value: 'game1',
        errors: null,
      },
    });
  });

  it('updates an error when sent a failure', () => {
    const reducedState = gameFormReducer(undefined, { type: PICK_NAME_FAIL, payload: 'error1' });
    expect(reducedState).toEqual({
      ...formInitialState,
      name: {
        value: null,
        errors: 'error1',
      },
    });
  });

  it('dont modify other values when sent a failure', () => {
    const state = {
      ...formInitialState,
      name: {
        value: 'game2',
        errors: 'error1',
      },
    };
    const reducedState = gameFormReducer(state, { type: PICK_NAME_FAIL, payload: 'error2' });
    expect(reducedState).toEqual({
      ...formInitialState,
      name: {
        value: 'game2',
        errors: 'error2',
      },
    });
  });
});
