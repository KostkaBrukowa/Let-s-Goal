import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const initialState = {};

// const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const middleware = [thunk]; // logger

export const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
