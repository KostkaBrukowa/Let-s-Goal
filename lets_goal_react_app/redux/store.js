import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import rootReducer from './reducers/rootReducer';

const initialState = {};

// const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const middleware = [thunk];

export const store = createStore(rootReducer, initialState,  applyMiddleware(...middleware));

export default store;
