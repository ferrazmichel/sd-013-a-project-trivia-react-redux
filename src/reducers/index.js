import { combineReducers } from 'redux';
import login from './login';
import fetchToken from './fetchToken';

const rootReducer = combineReducers({ login, fetchToken });

export default rootReducer;
