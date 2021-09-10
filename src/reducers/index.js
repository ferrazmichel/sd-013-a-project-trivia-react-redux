import { combineReducers } from 'redux';
import gameReducer from './game';
import playerReducer from './player';

const rootReducer = combineReducers({
  player: playerReducer,
  game: gameReducer,
});

export default rootReducer;
