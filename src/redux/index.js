import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import fetchMiddleware from './middleware/fetchMiddleware';
import movies from './modules/categories/reducer';

const reducers = combineReducers({
  movies,
});

const store = createStore(reducers, applyMiddleware(fetchMiddleware))

export default store;
