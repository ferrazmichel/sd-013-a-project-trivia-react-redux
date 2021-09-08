import { combineReducers } from 'redux';
import player from './player';
import gameSettings from './gameSettings';

const rootReducer = combineReducers({ player, gameSettings });

export default rootReducer;
