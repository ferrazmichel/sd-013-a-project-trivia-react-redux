import { SET_QUESTIONS } from '../Actions';

const INITIAL_STATE = {
  questions: [],
};

const reducerQuestions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTIONS:
    return ({
      ...state,
      questions: action.payLoad,
    });
  default:
    return state;
  }
};

export default reducerQuestions;
