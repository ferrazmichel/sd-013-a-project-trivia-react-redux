import { SAVE_USER_INFO } from "../actions";

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
}

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case SAVE_USER_INFO:
      return {
        ...state,
        name: payload.name,
        gravatarEmail: payload.email,
      }
    default: {
      return state;
    }
  }
}

export default player;
