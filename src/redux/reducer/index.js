import { combineReducers } from 'redux';
import user from './user';
import trivia from './trivia';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducers = combineReducers({
  user,
  trivia,
});

export default rootReducers;
