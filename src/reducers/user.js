import { SAVE_INFO_PLAYER } from '../actions/actionsTypes';

const INITIAL_STATE = {
  email: '',
  nickname: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_INFO_PLAYER:
    return {
      ...state,
      email: action.email,
      nickname: action.nickname,
    };
  default:
    return state;
  }
};

export default user;
