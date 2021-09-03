import {
  IS_LOADING_SHOW_MILHAO,
  REQUEST_SHOW_MILHAO_SUCESS,
  REQUEST_FAILED,
  IS_LOADING_QUESTIONS_SHOW,
  REQUEST_QUESTIONS_SHOW_SUCESS,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  isLoading: false,
  token: '',
  questions: {},
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_LOADING_SHOW_MILHAO:
    return { ...state, isLoading: true };

  case REQUEST_SHOW_MILHAO_SUCESS:
    return { ...state,
      isLoading: false,
      token: action.token,
    };

  case REQUEST_FAILED:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case IS_LOADING_QUESTIONS_SHOW:
    return {
      ...state, isLoading: true,
    };
  case REQUEST_QUESTIONS_SHOW_SUCESS:
    return {
      ...state,
      isLoading: false,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default questions;
