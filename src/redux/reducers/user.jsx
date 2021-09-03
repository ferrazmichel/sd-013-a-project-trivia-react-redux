import {
  ACTION_GET_TOKEN_ERROR,
  ACTION_GET_TOKEN_SUCESS,
  ACTION_SAVE_DATA_USER,
  ACTION_SAVE_IMG_URL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  token: '', // Token inicia vazio
  errorToken: '',
  playerName: '',
  email: '',
};
const reducerUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_GET_TOKEN_SUCESS:
    return { ...state, ...action.state, errorToken: '' };
  case ACTION_GET_TOKEN_ERROR:
    return { ...state, error: 'Ocorreu um erro com a requisição do token' };
  case ACTION_SAVE_DATA_USER:
    return { ...state, ...action.state };
  case ACTION_SAVE_IMG_URL:
    return { ...state, picture: action.payload };
  default: return state;
  }
};

export default reducerUser;
