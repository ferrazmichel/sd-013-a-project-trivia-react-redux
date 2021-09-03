import { SAVE_INFO_PLAYER } from '../actions/actionsTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_INFO_PLAYER:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
