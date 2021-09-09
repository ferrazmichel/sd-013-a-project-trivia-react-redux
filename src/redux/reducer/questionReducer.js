import { SAVE_QUESTION } from '../action';

const INITIAL_STATE = {
  results: [],
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTION:
    return {
      ...state,
      results: [...state.results, ...action.payload.results],
    };
  default:
    return state;
  }
};

export default questionReducer;
