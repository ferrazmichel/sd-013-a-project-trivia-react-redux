import {
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

  default:
    return state;
  }
};

export default userReducer;
