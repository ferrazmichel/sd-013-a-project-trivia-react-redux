import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import reducerQuestions from './reducerQuestions';

const rootReducer = combineReducers({
  reducerLogin, reducerQuestions,

});

export default rootReducer;
