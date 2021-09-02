import md5 from 'crypto-js/md5';

export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const ADD_USER = 'ADD_USER';
const TOKEN_REQUEST = 'https://opentdb.com/api_token.php?command=request';

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
  generateHash: md5(payload.email).toString(),
});

export const getTokenSuccess = (token) => ({ type: GET_TOKEN_SUCCESS, payload: token });
export const getTokenError = (error) => ({ type: GET_TOKEN_ERROR, payload: error });

export const fetchToken = () => (async (dispatch) => {
  try {
    const fetchAPI = await fetch(TOKEN_REQUEST);
    const data = await fetchAPI.json();
    return dispatch(getTokenSuccess(data));
  } catch (error) { return dispatch(getTokenError(error)); }
});
