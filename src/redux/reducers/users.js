import { GET_TOKEN_SUCCESS, GET_TOKEN_ERROR } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
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
  default:
    return state;
  }
};

export default player;
