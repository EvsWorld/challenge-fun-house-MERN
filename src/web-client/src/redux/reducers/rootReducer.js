import { combineReducers } from 'redux';
import charactersReducer from './charactersSlice';

export default combineReducers({
  characters: charactersReducer,
});
