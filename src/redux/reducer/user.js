import { GET_LOGIN } from '../actions/actionType';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return { ...state, name: action.payload.name, email: action.payload.email };

  default:
    return state;
  }
};

export default user;
