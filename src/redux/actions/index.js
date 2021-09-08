import { getQuestionsFetch } from '../../services/Api';
import { GET_LOGIN, GET_QUESTIONS, GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL } from './actionType';

export const getLogin = (payload) => ({
  type: GET_LOGIN, payload,
});

const getQuestions = () => ({
  type: GET_QUESTIONS,
});

const getQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS, payload,
});

const getQuestionsFail = () => ({
  type: GET_QUESTIONS_FAIL,
});

export const fetchQuestionsThunk = () => (dispatch) => {
  dispatch(getQuestions());
  return getQuestionsFetch()
    .then(
      ({ results }) => dispatch(getQuestionsSuccess(results)),
      () => dispatch(getQuestionsFail()),
    );
};
