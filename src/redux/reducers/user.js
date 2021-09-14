import {
  FAILED_REQUEST,
  GET_TOKEN,
  REQUEST_API,
  SAVE_USER,
  HANDLE_SCORE,
  SET_SETTINGS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  isLoading: false,
  score: 0,
  assertions: 0,
  difficulty: '',
  questionType: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
      score: 0,
      assertions: 0 };

  case REQUEST_API:
    return { ...state, isLoading: true };
  case FAILED_REQUEST:
    return { ...state, isLoading: false, error: action.error };
  case GET_TOKEN:
    return { ...state, isLoading: false, token: action.token };
  case HANDLE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  case SET_SETTINGS:
    return {
      ...state,
      difficulty: action.difficulty,
      questionType: action.questionType,
    };
  default:
    return state;
  }
};

export default user;
