import { combineReducers } from 'redux';
import userReducer from './userReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({ userReducer, loginReducer });

export default rootReducer;
