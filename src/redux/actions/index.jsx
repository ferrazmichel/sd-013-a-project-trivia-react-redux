import {
  // Actions do reducer User
  ACTION_GET_TOKEN_ERROR,
  ACTION_GET_TOKEN_SUCESS,
  ACTION_SAVE_DATA_USER,
} from './actionTypes';

// Actions do reducer User
export const actionGetTokenSucess = (state) => ({ type: ACTION_GET_TOKEN_SUCESS, state });
export const actionGetTokenError = () => ({ type: ACTION_GET_TOKEN_ERROR });
export const actionSaveDataUser = (state) => ({ type: ACTION_SAVE_DATA_USER, state });
