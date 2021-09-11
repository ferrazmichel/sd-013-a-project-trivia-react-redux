import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import reducerQuestions from './reducerQuestions';
import reducerStorage from './reducerStorage';

const rootReducer = combineReducers({
  reducerLogin,
  reducerQuestions,
  reducerStorage,
});

export default rootReducer;
