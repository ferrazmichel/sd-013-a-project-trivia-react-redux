import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return { ...state, ...action.payload };
  default: return state;
  }
}

export default userReducer;
