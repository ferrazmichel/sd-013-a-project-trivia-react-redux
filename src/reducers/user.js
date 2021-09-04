import { SAVE_INFO_PLAYER } from '../actions/actionsTypes';

const testState = {
  email: 'murilorainho01@gmail.com',
  nickname: 'A_Mask_Collect',
};

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
