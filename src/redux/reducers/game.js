import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_ERROR,
  UPDATE_SECONDS, RESET_SECONDS, ASSERT, SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  questions: [],
  error: '',
  index: 0,
  seconds: 30,
  asserts: 0,
  score: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload,
    };
  case GET_QUESTIONS_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  case UPDATE_SECONDS:
    return {
      ...state,
      seconds: state.seconds - 1,
    };
  case RESET_SECONDS:
    return {
      ...state,
      seconds: 30,
    };
  case ASSERT:
    return {
      ...state,
      asserts: state.asserts + 1,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
