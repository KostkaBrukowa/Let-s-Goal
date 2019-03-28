import { combineReducers } from 'redux';

import user from './userReducer';
import gameForm from './gameFormReducer';
import gameAPI from './gameAPIReducer';
import appState from './appStateReducer';
import gameManager from './gameManagerReducer';

export const rootReducer = combineReducers({
  user,
  gameForm,
  gameAPI,
  appState,
  gameManager,
});

export default rootReducer;
