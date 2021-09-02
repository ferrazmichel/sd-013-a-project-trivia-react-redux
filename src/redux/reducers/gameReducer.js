import {
  RESET_GAME_STATE,
  FETCHING_QUESTIONS,
  SAVE_QUESTIONS,
  SAVE_ERROR_QUESTIONS,
  TOKEN_EXPIRED,
  UPDATE_SCORE,
  UPDATE_RANKING,
} from '../actions';

const initialState = {
  isFetchingQuestions: false,
  tokenExpired: false,
  error: '',
  score: 0,
  assertions: 0,
  questions: [],
  ranking: [],
};

function gameReducer(state = initialState, { type, payload }) {
  switch (type) {
  case RESET_GAME_STATE:
    return initialState;

  case FETCHING_QUESTIONS:
    return { ...state, isFetchingQuestions: true };

  case TOKEN_EXPIRED:
    return { ...state, tokenExpired: true, isFetchingQuestions: false };

  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: payload,
      tokenExpired: false,
      error: '',
      isFetchingQuestions: false,
    };

  case SAVE_ERROR_QUESTIONS:
    return {
      ...state,
      tokenExpired: false,
      questions: [],
      error: payload,
      isFetchingQuestions: false,
    };

  case UPDATE_SCORE:
    return { ...state, ...payload };

  case UPDATE_RANKING:
    return { ...state, ranking: payload };

  default:
    return state;
  }
}

export default gameReducer;
