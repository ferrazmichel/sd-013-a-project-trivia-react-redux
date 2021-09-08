import { RECEIVE_API_TOKEN, RECEIVE_API_QUESTIONS, STATE_ANSWERED } from '../actions';

const INITIAL_STATE = ({
  token: '',
  questions: [],
  answered: false,
});

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_API_TOKEN:
    return { ...state, token: action.data };
  case RECEIVE_API_QUESTIONS:
    return { ...state, questions: action.results };
  case STATE_ANSWERED:
    return { ...state, answered: action.payload };
  default:
    return state;
  }
}

export default trivia;
