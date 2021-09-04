import { GET_TOKEN_SUCCESS, GET_TOKEN_ERROR, ADD_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  gravatarEmail: '',
  error: '',
};

export const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload,
    };
  case GET_TOKEN_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  case ADD_USER:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
      gravatarEmail: `https://www.gravatar.com/avatar/${action.generateHash}` };
  default:
    return state;
  }
};

export default player;
