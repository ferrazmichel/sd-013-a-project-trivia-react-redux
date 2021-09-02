import { SAVE_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return { name: action.name, email: action.email };
  default:
    return state;
  }
};

export default user;
