import { combineReducers } from 'redux';
import user from './user';
import play from './play';

const rootReducers = combineReducers({
  user, play,
});

export default rootReducers;
