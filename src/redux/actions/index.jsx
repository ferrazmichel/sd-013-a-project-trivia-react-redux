import {
<<<<<<< HEAD
  // Actions do reducer Gravatar
  ACTION_FETCH_SUCCESS,
  // Actions do reducer Quiz
  ACTION_FETCHING_QUIZ,
  ACTION_GET_QUIZ,
  ACTION_TIMEOUT_FALSE,
  ACTION_TIMEOUT_TRUE,
||||||| 059f27d
=======
  // Actions do reducer Gravatar
  ACTION_FETCH_SUCCESS,
>>>>>>> c7a359b10dd9d2d4aac2328007ad08e5a4a3eaaf
  // Actions do reducer User
  ACTION_ADD_SETTING,
  ACTION_GET_TOKEN_ERROR,
  ACTION_GET_TOKEN_SUCESS,
  ACTION_SAVE_DATA_USER,
<<<<<<< HEAD
  ACTION_SAVE_IMG_URL,
||||||| 059f27d
=======
  ACTION_SAVE_IMG_URL,

>>>>>>> c7a359b10dd9d2d4aac2328007ad08e5a4a3eaaf
} from './actionTypes';

// Actions do reducer Gravatar
export const actionGetGravatar = (payload) => ({ type: ACTION_FETCH_SUCCESS, payload });

// Actions do reducer Quiz
export const actionFetchingQuiz = () => ({ type: ACTION_FETCHING_QUIZ });
export const actionGetQuiz = (payload) => ({ type: ACTION_GET_QUIZ, payload });
export const actionTimeoutFalse = () => ({ type: ACTION_TIMEOUT_FALSE });
export const actionTimeoutTrue = () => ({ type: ACTION_TIMEOUT_TRUE });

// Actions do reducer User
<<<<<<< HEAD
export const actionSaveImgUrl = (payload) => ({ type: ACTION_SAVE_IMG_URL, payload }); // Requisito 04
export const actionGetTokenSucess = (state) => ({ type: ACTION_GET_TOKEN_SUCESS, state }); // Requisito 01
export const actionGetTokenError = () => ({ type: ACTION_GET_TOKEN_ERROR }); // Requisito 01
export const actionAddSetting = (state) => ({ type: ACTION_ADD_SETTING, state }); // Requisito 03
export const actionSaveDataUser = (state) => ({ type: ACTION_SAVE_DATA_USER, state }); // Requisito 01/02
||||||| 059f27d
export const actionGetTokenSucess = (state) => ({ type: ACTION_GET_TOKEN_SUCESS, state });
export const actionGetTokenError = () => ({ type: ACTION_GET_TOKEN_ERROR });
export const actionSaveDataUser = (state) => ({ type: ACTION_SAVE_DATA_USER, state });
=======
export const actionGetTokenSucess = (state) => ({ type: ACTION_GET_TOKEN_SUCESS, state });
export const actionGetTokenError = () => ({ type: ACTION_GET_TOKEN_ERROR });
export const actionSaveDataUser = (state) => ({ type: ACTION_SAVE_DATA_USER, state });
export const actionGetGravatar = (payload) => ({ type: ACTION_FETCH_SUCCESS, payload }); // Actions do gravatar
export const actionSaveImgUrl = (payload) => ({ type: ACTION_SAVE_IMG_URL, payload });
>>>>>>> c7a359b10dd9d2d4aac2328007ad08e5a4a3eaaf
