import {
  REQUEST_TOKEN,
  GET_TOKEN,
  SET_CATEGORY,
  SUBMIT_QUESTIONS,
  ADD_CURRENT_COUNT,
} from './actionTypes';

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const getToken = (token) => ({
  type: GET_TOKEN,
  userToken: token,
});

const getQuestions = (questions) => ({
  type: 'GET_QUESTIONS',
  questions,
});

const getQuestionsError = (error) => ({
  type: 'GET_QUESTIONS_ERROR',
  error,
});

const saveTokenOnLocalStorage = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
};

function fetchActions() {
  return (dispatch) => {
    dispatch(requestToken());
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => response.token)
      .then((token) => {
        saveTokenOnLocalStorage(token);
        dispatch(getToken(token));
      });
  };
}

export function fetchQuestions(token) {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const questions = await response.json();
      return dispatch(getQuestions(questions.results));
    } catch (error) {
      return dispatch(getQuestionsError(error));
    }
  };
}

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  categoryName: category,
});

export const submitQuestions = (payload) => ({
  type: SUBMIT_QUESTIONS,
  payload,
});

export const categoriesThunk = () => (results) => ({
  type: 'GET_QUESTIONS',
  questions: results,
});

export const getCurrentCount = (payload) => ({
  type: ADD_CURRENT_COUNT,
  count: payload,
});

const awaitCount = () => ({
  type: 'AWAIT',
});

export function addCurrentCount(payload) {
  return (dispatch) => {
    dispatch(awaitCount());
    const results = dispatch(getCurrentCount(payload));

    return results;
  };
}

export default fetchActions;
