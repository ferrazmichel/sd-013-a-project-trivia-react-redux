import {
  GET_TOKEN,
  GET_TOKEN_LOADING,
  GET_TOKEN_FAILED,
  GET_STATE_STORE,
  GET_GAME,
} from './actionTypes';

import getCurrentToken from '../helpers/getCurrentToken';
import getCurrentGame from '../helpers/getCurrentGame';

const actionGetToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

const actionLoading = () => ({
  type: GET_TOKEN_LOADING,
});

const actionGetTokenFailed = () => ({
  type: GET_TOKEN_FAILED,
});

export const actionToStore = (payload) => ({
  type: GET_STATE_STORE,
  payload,
});

export const actionGetGame = (payload) => ({
  type: GET_GAME,
  payload,
});

export const actionGetTokenWithThunk = () => (dispatch) => {
  dispatch(actionLoading());
  return getCurrentToken()
    .then(
      (payload) => dispatch(actionGetToken(payload)),
      () => dispatch(actionGetTokenFailed()),
    );
};

export const actionGetGameWithThunk = () => (dispatch) => {
  dispatch(actionLoading());
  return getCurrentGame()
    .then(
      (payload) => dispatch(actionGetGame(payload)),
      () => dispatch(actionGetTokenFailed()),
    );
};
