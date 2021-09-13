import { UPDATE_CONFIG } from '../actions';

const INITIAL_STATE = {
  category: 'any',
  nQuestions: '5',
  diff: 'any',
};

const optionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_CONFIG:
    return {
      ...state, ...action.payload,
    };
  default:
    return state;
  }
};

export default optionsReducer;
