import { combineReducers } from 'redux';
import user from './user';
import play from './play';
import timer from './timer';

const rootReducers = combineReducers({
  user,
  play,
  timer,
});

export default rootReducers;
