import {
  ACTION_GET_TOKEN_ERROR,
  ACTION_GET_TOKEN_SUCESS,
} from '../actions/actionTypes'

INITIAL_STATE = {
  token: '', // Token inicia vazio
  errorToken: '',
}
const reducerUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_GET_TOKEN_SUCESS:
      return { ...state, ...action.state, errorToken:'' }
    case ACTION_GET_TOKEN_ERROR:
      return { ...state, error: 'Ocorreu um erro com a requisição do token'}
    default: return state
  }
}

export default reducerUser;
