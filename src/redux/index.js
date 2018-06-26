import { applyMiddleware, combineReducers, createStore } from 'redux';
import fetchMiddleware from './middleware/fetchMiddleware';
import movies from './modules/categories/reducer';

const reducers = combineReducers({
  movies,
});

const store = createStore(reducers, applyMiddleware(fetchMiddleware))

export default store;
