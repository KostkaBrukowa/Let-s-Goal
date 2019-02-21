import {
  PICK_NAME_SUCCESS,
  PICK_NAME_FAIL,
  PICK_PLAYER_NUMBER_SUCCESS,
  PICK_PLAYER_NUMBER_FAIL,
  PICK_FIELD_SUCCESS,
  PICK_FIELD_FAIL,
  PICK_DATE_SUCCESS,
  PICK_DATE_FAIL,
  NEW_GAME_FORM_SUBIMT_SUCCESS,
  NEW_GAME_FORM_FAIL,
} from '../actions/types';

export const formInitialState = {
  errors: null,
  name: {
    value: null,
    errors: null,
  },
  playersNumber: {
    value: null,
    errors: null,
  },
  date: {
    value: null,
    errors: null,
  },
  playingField: {
    value: null,
    errors: null,
  },
};

const success = (state, field, value) => ({
  ...state,
  [field]: { value, errors: null },
});

const fail = (state, field, errors) => {
  const { value: prevValue } = state[field];
  return {
    ...state,
    [field]: { value: prevValue, errors },
  };
};

export default function (state = formInitialState, action) {
  switch (action.type) {
    case NEW_GAME_FORM_SUBIMT_SUCCESS:
      return formInitialState;

    case NEW_GAME_FORM_FAIL:
      return {
        ...state,
        errors: action.payload,
      };

    case PICK_NAME_SUCCESS:
      return success(state, 'name', action.payload);

    case PICK_NAME_FAIL:
      return fail(state, 'name', action.payload);

    case PICK_PLAYER_NUMBER_SUCCESS:
      return success(state, 'playersNumber', action.payload);

    case PICK_PLAYER_NUMBER_FAIL:
      return fail(state, 'playersNumber', action.payload);

    case PICK_FIELD_SUCCESS:
      return success(state, 'playingField', action.payload);

    case PICK_FIELD_FAIL:
      return fail(state, 'playingField', action.payload);

    case PICK_DATE_SUCCESS:
      return success(state, 'date', action.payload);

    case PICK_DATE_FAIL:
      return fail(state, 'date', action.payload);

    default:
      return state;
  }
}
