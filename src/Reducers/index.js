import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import reducerQuestions from './reducerQuestions';
import reducerPlacar from './reducerPlacar';

const rootReducer = combineReducers({
  reducerLogin, reducerQuestions, reducerPlacar,

});

export default rootReducer;
