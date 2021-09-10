import { scoreReducerInitialState, UPDATE_SCORE, RESET_GAME } from '../../constants';

const scoreReducer = (state = scoreReducerInitialState, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return { ...state, score: state.score + action.score };
  case RESET_GAME:
    return { ...state, score: 0 };
  default:
    return state;
  }
};

export default scoreReducer;
