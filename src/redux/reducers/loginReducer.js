import { REGISTER_USER, loginReducerInitialState } from '../../constants';

const loginReducer = (state = loginReducerInitialState, action) => {
  switch (action.type) {
  case REGISTER_USER:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default loginReducer;
