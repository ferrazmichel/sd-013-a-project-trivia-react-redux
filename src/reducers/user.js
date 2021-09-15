import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  options: {
    numberOfQuestions: 5,
    category: '',
    difficulty: '',
    type: '',
  },
};

function userReducer(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
  case USER_INFO:
    return { ...state, ...action.payload };
  default: return state;
  }
}

export default userReducer;
