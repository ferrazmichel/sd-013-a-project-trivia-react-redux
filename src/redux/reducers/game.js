import { REQUEST_TOKEN, GET_TOKEN_SUCESS, GET_TOKEN_FAIL } from '../actions';

const initialState = {
  token: '',
  error: '',
  isLoading: false,
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

function game(state = initialState, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isLoading: true,
    };
  case GET_TOKEN_SUCESS:
    return {
      ...state,
      token: action.token,
      isLoading: false,
    };
  case GET_TOKEN_FAIL:
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  default:
    return state;
  }
}

export default game;
