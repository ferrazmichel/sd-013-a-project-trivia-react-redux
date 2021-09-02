import {
  REGISTER_USER,
  FETCHING_TOKEN,
  SAVE_TOKEN,
  SAVE_ERROR_TOKEN,
} from '../actions';

const initialState = {
  name: '',
  email: '',
  gravatar: '',
  isFetchingToken: false,
  token: '',
  error: '',
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
  case REGISTER_USER:
    return { ...state, ...payload };

  case FETCHING_TOKEN:
    return { ...state, isFetchingToken: true };

  case SAVE_TOKEN:
    return { ...state, token: payload, error: '', isFetchingToken: false };

  case SAVE_ERROR_TOKEN:
    return { ...state, error: payload, token: '', isFetchingToken: false };

  default:
    return state;
  }
}

export default userReducer;
