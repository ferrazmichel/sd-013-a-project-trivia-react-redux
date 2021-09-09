import { combineReducers } from 'redux';
import login from '../../pages/Login';
import fetchToken from './FetchQuestion';

const rootReducer = combineReducers({ login, fetchToken });

export default rootReducer;
