import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail };
  default: return state;
  }
}

export default userReducer;
