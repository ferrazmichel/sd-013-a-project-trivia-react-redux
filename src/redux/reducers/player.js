import { SAVE_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: 'brunopinho@outlook.com',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return { ...state, ...action.payload };

  default:
    return state;
  }
};

export default player;
