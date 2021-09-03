import { USER_INFO } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  player: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      email: action.payload.email,
      player: action.payload.player,
    };
  default:
    return state;
  }
}

export default userReducer;
