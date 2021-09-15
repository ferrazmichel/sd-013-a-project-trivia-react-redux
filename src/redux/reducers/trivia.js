import { RECEIVE_API_TOKEN, RECEIVE_API_QUESTIONS,
  STATE_ANSWERED, GET_API_TOKEN } from '../actions';

const INITIAL_STATE = ({
  token: '',
  questions: [],
  loading: true,
  answered: false,
});

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_API_TOKEN:
    return { ...state, loading: true };
  case RECEIVE_API_TOKEN:
    return { ...state, loading: false, token: action.data };
  case RECEIVE_API_QUESTIONS:
    return { ...state, questions: action.results };
  case STATE_ANSWERED:
    return { ...state, answered: action.payload };
  default:
    return state;
  }
}

export default trivia;
