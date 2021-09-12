import { PLAYER_INFO } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER_INFO:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

export default playerReducer;
