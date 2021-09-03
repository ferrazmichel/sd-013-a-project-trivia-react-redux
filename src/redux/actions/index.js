export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const SUCCESS_REQUEST = 'SUCCESS_REQUEST';

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const successRequestQuestions = (payload) => ({
  type: SUCCESS_REQUEST,
  payload,
});

export const fetchQuestions = (numberQuestions, token) => async (dispatch) => {
  dispatch(requestQuestions());
  const resultQuestions = await fetch(`https://opentdb.com/api.php?amount=${numberQuestions}&token=${token}`);
  const resultJson = await resultQuestions.json();
  dispatch(successRequestQuestions(resultJson.results));
};
