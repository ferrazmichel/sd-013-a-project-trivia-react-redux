import { RECEIVE_API_TOKEN, RECEIVE_API_QUESTIONS } from '../actions';

const INITIAL_STATE = ({
  token: '',
  questions: [],
});

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_API_TOKEN:
    return { ...state, token: action.data };
  case RECEIVE_API_QUESTIONS:
    return { ...state, questions: action.results };
  default:
    return state;
  }
}

export default trivia;
