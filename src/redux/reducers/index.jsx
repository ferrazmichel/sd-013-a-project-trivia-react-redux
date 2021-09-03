import { combineReducers } from 'redux';

import user from './user';
import quiz from './quiz';
import gravatar from './gravatar';

const rootReducer = combineReducers({
  user,
  quiz,
  gravatar,
});

export default rootReducer;
