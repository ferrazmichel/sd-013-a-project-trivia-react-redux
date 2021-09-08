import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_ERROR,
  ASSERT, SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  questions: [],
  error: '',
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
