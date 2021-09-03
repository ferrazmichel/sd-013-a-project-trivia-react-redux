import { combineReducers } from 'redux';
import player from './player';
import apiTrivia from './apiTrivia';

const rootReducer = combineReducers({ player, apiTrivia });

export default rootReducer;
