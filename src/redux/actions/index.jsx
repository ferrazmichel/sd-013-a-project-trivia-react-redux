import {
  // Actions do reducer User
  ACTION_GET_TOKEN_ERROR,
  ACTION_GET_TOKEN_SUCESS,
} from './actionTypes'

// Actions do reducer User
export const actionGetTokenSucess = (state) => ({ type: ACTION_GET_TOKEN_SUCESS, state})
export const actionGetTokenError = () => ({ type: ACTION_GET_TOKEN_ERROR })
