import { GET_LOGIN } from '../actions/actionType';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 10,
  picture: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return { ...state, ...action.payload };

  default:
    return state;
  }
};

export default user;
