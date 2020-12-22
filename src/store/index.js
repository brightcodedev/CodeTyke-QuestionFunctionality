import { createStore, combineReducers } from 'redux';
import selection from './Selection';

const rootReducer = combineReducers({
  selection
});

const store = createStore(rootReducer);

export default store;
