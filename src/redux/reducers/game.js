import { REQUEST_TOKEN,
  GET_TOKEN_SUCESS,
  GET_TOKEN_FAIL,
  VALID_LOGIN,
  SET_CONFIGS } from '../actions';

const initialState = {
  token: '',
  error: '',
  isLoading: false,
  player: {
    name: '',
    gravatarEmail: '',
  },
  configs: {
    category: '0',
    difficulty: '0',
    type: '0',
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
  case VALID_LOGIN:
    return {
      ...state,
      player: { ...state.player, name: action.name, gravatarEmail: action.email },
    };
  case SET_CONFIGS:
    return {
      ...state,
      configs: action.configs,
    };
  default:
    return state;
  }
}

export default game;
