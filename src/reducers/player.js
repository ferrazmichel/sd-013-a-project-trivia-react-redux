import { PLAYER_LOGGED_IN } from '../actions';

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
  default:
    return state;
  }
};

export default playerReducer;
