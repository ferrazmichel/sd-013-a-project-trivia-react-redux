import { TIME_INFO } from '../actions';

const INITIAL_STATE = {
  time: 30,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TIME_INFO:
    return {
      ...state,
      time: action.payload.time };
  default: return state;
  }
}

export default userReducer;
