import { combineReducers } from 'redux';
import characters from './charactersSlice';
import user from './userSlice';

export default combineReducers({
  user,
  characters,
});
