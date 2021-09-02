export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const SUCCESS_API = 'SUCCESS_API';

const setLogin = (login, email) => ({
  type: LOGIN, login, email,
});

export default setLogin;

export const requestApi = () => ({ type: REQUEST_API });

export const finishAPI = (questions) => ({
  type: SUCCESS_API,
  questions,
});

export function fetchAPI() {
  return (dispatch) => {
    dispatch(requestApi);
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => data.token)
      .then((token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
        .then((info) => info.json())
        .then((questions) => dispatch(finishAPI(questions))));
  };
}
