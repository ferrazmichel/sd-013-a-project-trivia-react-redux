import { ENABLE_NEXT_QUESTION, GET_QUESTIONS } from '../actions';

const initialState = {
  questions: [],
  loading: true,
  answered: false,
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_QUESTIONS: {
    return { ...state, questions: action.payload, loading: false };
  }
  case ENABLE_NEXT_QUESTION: {
    return { ...state, answered: action.payload };
  }
  default:
    return state;
  }
};

export default matchReducer;
