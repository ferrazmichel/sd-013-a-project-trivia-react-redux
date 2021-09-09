// Esse reducer será responsável por tratar as informações da pessoa usuária
import { getUser } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case getUser:
    return { ...state, email: action.email, name: action.name };
  default:
    return state;
  }
};

export default user;
