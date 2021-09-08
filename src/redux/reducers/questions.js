import { REQUEST_QUESTIONS, DISABLE_BUTTONS, SUCCESS_REQUEST } from '../actions';

const INITIAL_STATE = {
  questions: [],
  disableButtons: false,
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
  case DISABLE_BUTTONS:
    return {
      ...state,
      disableButtons: true,
    };
  default:
    return state;
  }
};

export default questionsReducer;
