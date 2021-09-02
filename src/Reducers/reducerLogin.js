import { SET_LOGIN } from '../Actions';

const INITIAL_STATE = {
  nome: '',
  email: '',
};

const reducerLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_LOGIN:
    return ({
      ...state,
      nome: action.payLoad.nome,
      email: action.payLoad.email,
    });
  default:
    return state;
  }
};

export default reducerLogin;
