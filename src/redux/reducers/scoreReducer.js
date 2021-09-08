import { scoreReducerInitialState, UPDATE_SCORE } from '../../constants';

const scoreReducer = (state = scoreReducerInitialState, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return { ...state, score: state.score + action.score };

  default:
    return state;
  }
};

export default scoreReducer;
