import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_ERROR } from '../actions';

const INITIAL_STATE = {
  questions: [],
  error: '',
  index: 0,
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
  default:
    return state;
  }
};

export default gameReducer;
