import { combineReducers } from 'redux';

import user from './userReducer';
import gameForm from './gameFormReducer';
import gameAPI from './gameAPIReducer';
import appState from './appStateReducer'

export const rootReducer = combineReducers({
  user,
  gameForm,
  gameAPI,
  appState,
});

export default rootReducer;
