import { combineReducers } from 'redux';
import user from './user';
import gravatar from './gravatar';

const rootReducer = combineReducers({
  user,
  gravatar,
});

export default rootReducer;
