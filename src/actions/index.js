export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const SUCCESS_API = 'SUCCESS_API';

const setLogin = (login, email) => ({
  type: LOGIN, login, email,
});

export default setLogin;

export const requestApi = () => ({ type: REQUEST_API });

export const finishAPI = (token) => ({
  type: SUCCESS_API,
  token,
});

export function fetchAPI() {
  return (dispatch) => {
    dispatch(requestApi);
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => data.token)
      .then((token) => dispatch(finishAPI(token)));
  };
}
