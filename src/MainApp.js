import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import MovieNavigator from './component/MovieNavigator';

const MainApp = () => (
  <Provider store={store}>
    <MovieNavigator />
  </Provider>
)

export default MainApp;
