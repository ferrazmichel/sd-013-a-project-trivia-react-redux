import {
  // Actions do reducer User
  ACTION_GET_TOKEN_ERROR,
  ACTION_GET_TOKEN_SUCESS,
  ACTION_SAVE_DATA_USER,
  // Actions do reducer Quiz
  ACTION_FETCHING_QUIZ,
  ACTION_GET_QUIZ,
  ACTION_TIMEOUT_FALSE,
  ACTION_TIMEOUT_TRUE,
} from './actionTypes';

// Actions do reducer User
export const actionGetTokenSucess = (state) => ({ type: ACTION_GET_TOKEN_SUCESS, state });
export const actionGetTokenError = () => ({ type: ACTION_GET_TOKEN_ERROR });
export const actionSaveDataUser = (state) => ({ type: ACTION_SAVE_DATA_USER, state });

// Actions do reducer Quiz
export const actionFetchingQuiz = () => ({ type: ACTION_FETCHING_QUIZ });
export const actionGetQuiz = (payload) => ({ type: ACTION_GET_QUIZ, payload });
export const actionTimeoutFalse = () => ({ type: ACTION_TIMEOUT_FALSE });
export const actionTimeoutTrue = () => ({ type: ACTION_TIMEOUT_TRUE });
