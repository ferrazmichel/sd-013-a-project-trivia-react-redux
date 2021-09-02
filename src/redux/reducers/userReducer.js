import { userReducerInitialState, USER_LOGIN } from '../../constants';

const userReducer = (state = userReducerInitialState, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default userReducer;
