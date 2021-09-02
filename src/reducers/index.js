import { combineReducers } from 'redux';
import login from './login';
import fetchQuest from './fetchQuest';

const rootReducer = combineReducers({ login, fetchQuest });

export default rootReducer;
