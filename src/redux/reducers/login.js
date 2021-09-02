import { SAVE_AVATAR } from '../actions';

const initialState = {
  avatar: '',
  user: '',
};

function login(state = initialState, action) {
  switch (action.type) {
  case SAVE_AVATAR:
    return {
      ...state,
      avatar: action.link,
      user: action.user,
    };
  default:
    return state;
  }
}

export default login;
