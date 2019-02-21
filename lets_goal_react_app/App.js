/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Provider } from 'react-redux';

import MainNavigator from './navigators/MainNavigator';
import { store } from './redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
