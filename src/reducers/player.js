import { PLAYER_LOGGED_IN, SCORE_UPDATED } from '../actions';

const initialState = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
  case PLAYER_LOGGED_IN: {
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  }
  case SCORE_UPDATED: {
    return {
      ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };
  }
  default:
    return state;
  }
};

export default playerReducer;
