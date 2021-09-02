import { REQUEST_API, SUCCESS_API } from '../actions';

const INITIAL_STATE = {
  questions: null,
};

const fetchQuest = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state };
  case SUCCESS_API:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
};

export default fetchQuest;
