import { combineReducers } from 'redux';
import user from './user';
import play from './play';
import rank from './rank';

const rootReducers = combineReducers({
  user,
  play,
  rank,
});

export default rootReducers;
