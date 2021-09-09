import { GET_LOGIN, SET_SCORE } from '../actions/actionType';
import { setLocalStorage } from '../../services/localStoreService';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  picture: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return { ...state, ...action.payload };

  case SET_SCORE:
    setLocalStorage('ranking', [{ ...state, score: state.score + action.payload }]);
    return { ...state, score: state.score + action.payload };

  default:
    return state;
  }
};

export default user;
