import { ADD_USER } from '../actions';

const initialState = {
  email: '',
  name: '',
};

function user(state = initialState, { type, payload }) {
  switch (type) {
  case ADD_USER:
    return { ...state, email: payload.userData.email, name: payload.userData.name };

  default:
    return state;
  }
}

export default user;
