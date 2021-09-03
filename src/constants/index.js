export const userReducerInitialState = {
  score: 0,
};

export const loginReducerInitialState = {
  name: '',
  email: '',
};

export const REGISTER_USER = 'REGISTER_USER';
export const START_FETCH = 'START_FETCH';
export const FINISH_FETCH = 'FINISH_FETCH';
export const API_URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
export const GET_TOKEN_FROM_LOCALSTORAGE = localStorage.getItem('token');

const NUM_ANSWERS = 5;
export const API_URL = (TOKEN, QTD_ANSWERS = NUM_ANSWERS) => `https://opentdb.com/api.php?amount=${QTD_ANSWERS}&token=${TOKEN}`;

export const USER_LOGIN = 'USER_LOGIN';
