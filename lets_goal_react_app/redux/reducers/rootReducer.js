import { combineReducers } from 'redux';

import user from './user';
import gameForm from './gameForm';

export const rootReducer = combineReducers({
  user,
  gameForm,
});

export default rootReducer;
