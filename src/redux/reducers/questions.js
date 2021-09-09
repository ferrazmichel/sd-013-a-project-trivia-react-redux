import { LOADING_TRUE, REQUEST_COMPLETE, REQUEST_FAIL } from '../actions';

const INITIAL_STATE = {
  loading: false,
  questions: {},
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING_TRUE:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_COMPLETE:
    return {
      ...state,
      loading: false,
      questions: action.questions,
    };
  case REQUEST_FAIL:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  default: return state;
  }
};

export default questions;
