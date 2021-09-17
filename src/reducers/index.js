import { combineReducers } from 'redux';
import login from './login';
import fetchToken from './fetchToken';
import fetchQuestions from './fetchQuestions';
import sendFeedback from './sendFeedbakc';
import saveSettings from './confiGame';

const rootReducer = combineReducers({ login,
  saveSettings,
  fetchToken,
  fetchQuestions,
  sendFeedback,
});

export default rootReducer;
