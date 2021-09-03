import { combineReducers } from 'redux';
import questions from './questions';
import user from './user';

const rootReducer = combineReducers({ questions, user });

export default rootReducer;
