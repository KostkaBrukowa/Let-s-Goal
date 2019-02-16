import { combineReducers } from 'redux';

import user from './userReducer';
import gameForm from './gameFormReducer';
import gameAPI from './gameAPIReducer';

export const rootReducer = combineReducers({
  user,
  gameForm,
  gameAPI,
});

export default rootReducer;
