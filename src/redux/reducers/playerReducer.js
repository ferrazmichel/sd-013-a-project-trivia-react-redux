import { CLEAR_STORE, SAVE_SCORE, SAVE_USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, payload, points }) => {
  switch (type) {
  case SAVE_USER_INFO:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + points,
      assertions: state.assertions + 1,
    };
  case CLEAR_STORE:
    return {
      ...INITIAL_STATE,
    };
  default: {
    return state;
  }
  }
};

export default player;
