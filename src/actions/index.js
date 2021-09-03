export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const SUCCESS_API = 'SUCCESS_API';
export const SUCCESS_QUEST = 'SUCCESS_QUEST';

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

export const questAPI = (questions) => ({
  type: SUCCESS_QUEST,
  questions,
});

export function fetchQuestions(token) {
  return (dispatch) => {
    dispatch(requestApi);
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((info) => info.json())
      .then((questions) => dispatch(questAPI(questions)));
  };
}
