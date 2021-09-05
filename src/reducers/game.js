import { GET_QUESTIONS } from '../actions';

const initialState = {
  questions: [],
  loading: true,
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_QUESTIONS: {
    return { ...state, questions: action.payload, loading: false };
  }
  default:
    return state;
  }
};

export default matchReducer;
