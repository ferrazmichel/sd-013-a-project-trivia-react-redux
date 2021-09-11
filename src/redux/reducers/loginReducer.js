import { REGISTER_USER, loginReducerInitialState, RESET_GAME } from '../../constants';

const loginReducer = (state = loginReducerInitialState, action) => {
  switch (action.type) {
  case REGISTER_USER:
    return { ...state, ...action.payload };
  case RESET_GAME:
    return { ...state, name: '', email: '' };
  default:
    return state;
  }
};

export default loginReducer;
