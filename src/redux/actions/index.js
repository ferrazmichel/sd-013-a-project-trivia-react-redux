import md5 from 'crypto-js/md5';
import tokenApi from '../../services/tokenAPI';
import fetch5Questions from '../../services/questionsAPI';

export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const ADD_USER = 'ADD_USER';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';
export const ASSERT = 'ASSERT';
export const SAVE_SCORE = 'SAVE_SCORE';

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
  generateHash: md5(payload.email).toString(),
});

export const getQuestionSuccess = ((payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
}));

export const getQuestionError = ((error) => ({
  type: GET_QUESTIONS_ERROR,
  error,
}));

export const assertsAction = () => ({ type: ASSERT });

export const saveScore = (payload) => ({ type: SAVE_SCORE, payload });

export const getTokenSuccess = (token) => ({ type: GET_TOKEN_SUCCESS, payload: token });
export const getTokenError = (error) => ({ type: GET_TOKEN_ERROR, payload: error });

export const fetchToken = () => (async (dispatch) => {
  try {
    const data = await tokenApi();
    return dispatch(getTokenSuccess(data));
  } catch (error) { return dispatch(getTokenError(error)); }
});

export const fetchQuestions = (token) => (
  async (dispatch) => {
    try {
      const data = await fetch5Questions(token);
      return dispatch(getQuestionSuccess(data.results));
    } catch (error) {
      return dispatch(getQuestionError(error));
    }
  });
