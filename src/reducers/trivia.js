import { REQUEST_API, RECEIVE_API } from '../actions';

const INITIAL_STATE = ({
  questions: [],
  loading: false,

});

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_API:
    return {
      ...state,
      loading: false,
      questions: { ...state, questions: action.data },
    };
  case REQUEST_API:
    return {
      ...state,
      loading: true,
    };
  default:
    return state;
  }
}

export default trivia;
