import {
  REQUEST_QUESTIONS,
  SUCCESS_REQUEST,
  ENABLE_DISABLE_BUTTON,
  RESTART_TIMER,
  PAUSE_TIMER,
  RECORD_TIME,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  disableButtons: false,
  restartTimer: false,
  pauseTimer: false,
  timer: 0,
};

const questionsReducer = (state = INITIAL_STATE, { type, payload, response, time }) => {
  switch (type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      loading: true,
    };
  case SUCCESS_REQUEST:
    return {
      ...state,
      loading: false,
      questions: payload,
    };
  case ENABLE_DISABLE_BUTTON:
    return {
      ...state,
      disableButtons: response,
    };
  case RESTART_TIMER:
    return {
      ...state,
      restartTimer: response,
    };
  case PAUSE_TIMER:
    return {
      ...state,
      pauseTimer: response,
    };
  case RECORD_TIME:
    return {
      ...state,
      timer: time,
    };
  default:
    return state;
  }
};

export default questionsReducer;
