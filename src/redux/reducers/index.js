import { combineReducers } from 'redux';
import questionsReducer from './questions';
import player from './playerReducer';

const rootReducer = combineReducers({ questionsReducer, player });

export default rootReducer;
