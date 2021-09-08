import { SAVE_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  default: return state;
  }
};

export default login;
