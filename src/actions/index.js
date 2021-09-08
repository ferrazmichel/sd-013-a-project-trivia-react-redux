import {
  GET_TOKEN,
  GET_TOKEN_LOADING,
  GET_TOKEN_FAILED,
  GET_STATE_STORE,
  GET_TRIVIA_LOADING,
  GET_TRIVIA,
  GET_INDEX_QUESTION,
} from './actionTypes';
import getCurrentToken from '../utilities/getCurrentToken';
import getQuestions from '../utilities/getQuestions';

const actionGetToken = (payload) => ({ type: GET_TOKEN, payload });

const actionLoading = () => ({ type: GET_TOKEN_LOADING });

const actionGetTokenFailed = () => ({ type: GET_TOKEN_FAILED });

export const actionToStore = (payload) => ({ type: GET_STATE_STORE, payload });

export const actionGetTokenWithThunk = () => (dispatch) => {
  dispatch(actionLoading());
  return getCurrentToken()
    .then(
      (payload) => dispatch(actionGetToken(payload)),
      () => dispatch(actionGetTokenFailed()),
    );
};

// ==================================================================================//

export const actionTriviaLoading = () => ({ type: GET_TRIVIA_LOADING });

export const actionGetTrivia = (payload) => ({ type: GET_TRIVIA, payload });

export const actionGetIndexQuestion = () => ({ type: GET_INDEX_QUESTION });

export const actionGetTriviaWithThunk = (token) => (
  async (dispatch) => {
    dispatch(actionTriviaLoading());
    try {
      const json = await getQuestions(token);
      return dispatch(actionGetTrivia(json.results));
    } catch (error) {
      return console.log(error);
    }
  }
);
