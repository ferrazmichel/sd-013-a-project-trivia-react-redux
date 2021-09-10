// constantes da aplicação

// initial state para os reducers
export const scoreReducerInitialState = {
  score: 0,
};

export const userReducerInitialState = {
  disabled: false,
  renderIndex: 0,
};

export const loginReducerInitialState = {
  name: '',
  email: '',
};

//  action types
export const REGISTER_USER = 'REGISTER_USER';
export const START_FETCH = 'START_FETCH';
export const FINISH_FETCH = 'FINISH_FETCH';
export const USER_LOGIN = 'USER_LOGIN';
export const DISABLE_ANSWER = 'DISABLE_ANSWER';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const TIMEOUT = 'TIMEOUT';
export const RESET_GAME = 'RESET_GAME';

// action creators da API
export const API_URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
export const GET_TOKEN_FROM_LOCALSTORAGE = localStorage.getItem('token');

const NUM_ANSWERS = 5;
export const API_URL = (TOKEN, QTD_ANSWERS = NUM_ANSWERS) => `https://opentdb.com/api.php?amount=${QTD_ANSWERS}&token=${TOKEN}&&encode=base64`;
