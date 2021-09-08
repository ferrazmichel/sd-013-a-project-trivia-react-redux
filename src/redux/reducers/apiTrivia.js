import {
  REQUEST_API,
  SAVE_TOKEN,
  SAVE_PERGUNTAS,
  REQUEST_PERGUNTAS,
} from '../actions';

const initialState = {
  loading: true,
  token: '',
  resultFrases: [],
  loadingPerguntas: true,
};

function apiReducer(state = initialState, action) {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, loading: true };
  case SAVE_TOKEN:
    return { ...state, loading: false, token: action.payload };
  case REQUEST_PERGUNTAS:
    return { ...state, loadingPerguntas: true };
  case SAVE_PERGUNTAS:
    return { ...state, loadingPerguntas: false, resultFrases: action.payload };
  default:
    return state;
  }
}

export default apiReducer;
