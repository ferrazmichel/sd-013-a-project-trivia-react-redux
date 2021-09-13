import { combineReducers } from 'redux';
import users from './users';
import game from './game';
import optionsReducer from './optionsReducer';

const rootReducer = combineReducers({ users, game, optionsReducer });

export default rootReducer;
