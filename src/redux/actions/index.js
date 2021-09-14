import {
  FAILED_REQUEST,
  GET_TOKEN,
  REQUEST_API,
  SAVE_USER,
  HANDLE_SCORE,
  SET_SETTINGS } from './actionTypes';

export const saveUser = (email, name) => ({
  type: SAVE_USER,
  email,
  name,
});

const requestApi = () => ({
  type: REQUEST_API,
});

const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

export function fetchTrivia() {
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json()
        .then(
          (json) => dispatch(getToken(json.token)),
          (error) => dispatch(failedRequest(error)),
        ));
  };
}

export const handleScore = (score) => ({
  type: HANDLE_SCORE,
  score,
});

export const setSettings = (difficulty, questionType) => ({
  type: SET_SETTINGS,
  difficulty,
  questionType,
});
