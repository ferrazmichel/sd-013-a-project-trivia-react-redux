import { combineReducers } from 'redux';
import userReducer from './userReducer';
import loginReducer from './loginReducer';
import scoreReducer from './scoreReducer';

const rootReducer = combineReducers({ userReducer, loginReducer, scoreReducer });

export default rootReducer;
