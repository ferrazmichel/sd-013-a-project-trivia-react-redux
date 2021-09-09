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
  console.log(action.payload);
  switch (action.type) {
  case PLAYER_INFO:
    return { player: {
      ...state.player,
      name: action.payload.name,
      assertions: action.payload.assertions,
      score: action.payload.score,
      gravatarEmail: action.payload.gravatarEmail } };
  default:
    return state;
  }
}

export default playerReducer;
