import { REQUEST_QUESTIONS, SUCCESS_REQUEST } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const questionsReducer = (state = INITIAL_STATE, { type, payload }) => {
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
  default:
    return state;
  }
};

export default questionsReducer;
