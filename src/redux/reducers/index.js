import { combineReducers } from 'redux';
import users from './users';
import game from './game';

const rootReducer = combineReducers({ users, game });

export default rootReducer;
