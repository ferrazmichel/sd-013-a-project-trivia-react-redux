import {
  FAIL_TRIVIA,
  LOAD_TRIVIA,
  SUCESS_TRIVIA,
} from '../actions';

// Esse reducer será responsável por tratar as informações das questões
const INITIAL_STATE = {
  results: [],
  error: '',
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOAD_TRIVIA:
    return {
      ...state,
    };

  case SUCESS_TRIVIA:
    return {
      ...state,
      results: action.payload,
    };

  case FAIL_TRIVIA:
    return {
      ...state,
      error: 'Not found',
    };

  default:
    return state;
  }
}

export default triviaReducer;
