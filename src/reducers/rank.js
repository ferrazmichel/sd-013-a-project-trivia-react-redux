import { RANKING_INFO } from '../actions';

const INITIAL_STATE = {
  ranking: [{
    gravatarEmail: '',
    name: '',
    score: 0,
  }],
};

function rankingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RANKING_INFO:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

export default rankingReducer;
