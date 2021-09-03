import { combineReducers } from 'redux';
import login from './login';
import fetchToken from './fetchToken';
import fetchQuestions from './fetchQuestions';

const rootReducer = combineReducers({ login, fetchToken, fetchQuestions });

export default rootReducer;
