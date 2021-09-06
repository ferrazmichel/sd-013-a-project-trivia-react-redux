import { combineReducers } from 'redux';
import matchReducer from './game';
import playerReducer from './player';

const rootReducer = combineReducers({
  player: playerReducer,
  game: matchReducer,
});

export default rootReducer;
