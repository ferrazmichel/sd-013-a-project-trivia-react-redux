import md5 from 'crypto-js/md5';
import tokenApi from '../../services/tokenAPI';
import fetchOnQuestions from '../../services/questionsAPI';

export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const ADD_USER = 'ADD_USER';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';
export const ASSERT = 'ASSERT';
export const SAVE_SCORE = 'SAVE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';
export const MISS_QUESTION = 'MISS_QUESTION';
export const RIGHT_QUESTION = 'RIGHT_QUESTION';
export const UPDATE_CONFIG = 'UPDATE_CONFIG';

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
  generateHash: md5(payload.email).toString(),
});

export const getQuestionSuccess = ((payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
}));

export const updateConfig = (payload) => ({ type: UPDATE_CONFIG, payload });
export const resetScore = () => ({ type: RESET_SCORE });
export const assertsAction = () => ({ type: ASSERT });
export const getQuestionError = ((payload) => ({ type: GET_QUESTIONS_ERROR, payload }));
export const saveScore = (payload) => ({ type: SAVE_SCORE, payload });
export const getTokenSuccess = (payload) => ({ type: GET_TOKEN_SUCCESS, payload });
export const getTokenError = (payload) => ({ type: GET_TOKEN_ERROR, payload });
export const sendRightQt = () => ({ type: RIGHT_QUESTION });
export const sendMissQt = () => ({ type: MISS_QUESTION });

export const fetchToken = () => (async (dispatch) => {
  try {
    const data = await tokenApi();
    return dispatch(getTokenSuccess(data));
  } catch (error) { return dispatch(getTokenError(error)); }
});

export const fetchQuestions = (token, options) => (
  async (dispatch) => {
    try {
      const data = await fetchOnQuestions(token, options);
      return dispatch(getQuestionSuccess(data.results));
    } catch (error) {
      return dispatch(getQuestionError(error));
    }
  });
