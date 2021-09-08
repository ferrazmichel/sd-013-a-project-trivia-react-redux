import {
  DISABLE_ANSWER,
  FINISH_FETCH,
  NEXT_QUESTION,
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

  case DISABLE_ANSWER:
    return { ...state, disabled: true };

  case NEXT_QUESTION:
    return { ...state, renderIndex: state.renderIndex + 1, disabled: false };

  default:
    return state;
  }
};

export default userReducer;
