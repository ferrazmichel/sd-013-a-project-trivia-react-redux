import {
  REQUEST_API,
  SAVE_TOKEN,
  SAVE_PERGUNTAS,
} from '../actions';

const initialState = {
  loading: true,
  token: '',
  resultFrases: [],
};

function apiReducer(state = initialState, action) {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, loading: true };
  case SAVE_TOKEN:
    return { ...state, token: action.payload };
  case SAVE_PERGUNTAS:
    return { ...state, resultFrases: action.payload };
  default:
    return state;
  }
}

export default apiReducer;
