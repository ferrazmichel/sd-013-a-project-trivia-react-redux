import {
  FAILED_REQUEST,
  GET_TOKEN,
  REQUEST_API,
  SAVE_USER,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  isLoading: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case GET_TOKEN:
    return {
      ...state,
      isLoading: false,
      token: action.token,
    };
  default:
    return state;
  }
};

export default user;
