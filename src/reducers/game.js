import { GET_QUESTIONS } from '../actions';

const initialState = {
  questions: [],
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_QUESTIONS: {
    return { ...state, questions: action.payload, isFetching: false };
  }
  default:
    return state;
  }
};

export default matchReducer;
