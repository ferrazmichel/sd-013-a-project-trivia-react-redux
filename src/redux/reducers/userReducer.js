import {
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  FINISH_FETCH,
  START_FETCH,
  userReducerInitialState,
  USER_LOGIN } from '../../constants';

const userReducer = (state = userReducerInitialState, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, ...action.payload };

  case START_FETCH:
    return { ...state, loading: true };

  case FINISH_FETCH:
    return { ...state, loading: false, questions: action.payload.results };

  case CORRECT_ANSWER:
    return { ...state, score: action.payload };

  case INCORRECT_ANSWER:
    return { ...state };

  default:
    return state;
  }
};

export default userReducer;
