export const SAVE_EMAIL = 'SAVE_EMAIL';
export const RECEIVE_API_TOKEN = 'RECEIVE_API_TOKEN';
export const RECEIVE_API_QUESTIONS = 'RECEIVE_API_QUESTIONS';
export const STATE_ANSWERED = 'STATE_ANSWERED';


export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });

export const receiveApiToken = (data) => ({
  type: RECEIVE_API_TOKEN,
  data,
});

export const receiveApiQuestions = (results) => ({
  type: RECEIVE_API_QUESTIONS,
  results,
});

export const state_answered = (payload) => ({
  type: STATE_ANSWERED,
  payload,
});

export function fetchApiToken() {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return dispatch(receiveApiToken(data.token));
  };
}

export function fetchApiQuestions(token) {
  return async (dispatch) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    return dispatch(receiveApiQuestions(data.results));
  };
}
