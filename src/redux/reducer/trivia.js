import {
  FAIL_TRIVIA,
  LOAD_TRIVIA,
  SUCESS_TRIVIA,
  UPDATE_SCORE,
} from '../actions';

// Esse reducer será responsável por tratar as informações das questões
const INITIAL_STATE = {
  results: [],
  error: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '' },
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOAD_TRIVIA:
    return {
      ...state,
    };

  case SUCESS_TRIVIA:
    localStorage.setItem('state', JSON.stringify(state.player));
    return {
      ...state,
      results: action.payload,
    };

  case FAIL_TRIVIA:
    return {
      ...state,
      error: 'Not found',
    };

  case UPDATE_SCORE:
    return { ...state, ...action.payload };

  default:
    return state;
  }
}

export default triviaReducer;
