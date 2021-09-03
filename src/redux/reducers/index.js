import { combineReducers } from 'redux';
import questionsReducer from './questions';

const rootReducer = combineReducers({ questionsReducer });

export default rootReducer;
