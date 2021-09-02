export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
const TOKEN_REQUEST = 'https://opentdb.com/api_token.php?command=request';

export const getTokenSuccess = (token) => ({ type: GET_TOKEN_SUCCESS, payload: token });
export const getTokenError = (error) => ({ type: GET_TOKEN_ERROR, payload: error });

export const fetchToken = () => (async (dispatch) => {
  console.log('entrou');
  try {
    const fetchAPI = await fetch(TOKEN_REQUEST);
    const data = await fetchAPI.json();
    
    return dispatch(getTokenSuccess(data));
  } catch (error) { return dispatch(getTokenError(error)); }
});
