export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const SUCCESS_REQUEST = 'SUCCESS_REQUEST';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const ENABLE_DISABLE_BUTTON = 'ENABLE_DISABLE_BUTTONS';
export const RESTART_TIMER = 'RESTART_TIMER';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const RECORD_TIME = 'RECORD_TIME';
export const SAVE_SCORE = 'SAVE_SCORE';
export const CLEAR_STORE = 'CLEAR_STORE';

export const saveUserInfo = (payload) => ({
  type: SAVE_USER_INFO,
  payload,
});

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

export const disableButtons = (response) => ({
  type: ENABLE_DISABLE_BUTTON,
  response,
});

export const restartTimer = (response) => ({
  type: RESTART_TIMER,
  response,
});

export const pauseTimer = (response) => ({
  type: PAUSE_TIMER,
  response,
});

export const recordTime = (time) => ({
  type: RECORD_TIME,
  time,
});

export const saveScore = (points) => ({
  type: SAVE_SCORE,
  points,
});

export const returnInitialState = () => ({
  type: CLEAR_STORE,
});
