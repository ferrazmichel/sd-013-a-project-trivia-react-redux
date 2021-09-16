import {
    IS_LOADING_SHOW_MILHAO,
    REQUEST_SHOW_MILHAO_SUCESS,
    REQUEST_SHOW_MILHAO_FAILED,
  } from '../actions/actionsTypes';
  
  const INITIAL_STATE = {
    isLoading: false,
  };
  
  const questions = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case IS_LOADING_SHOW_MILHAO:
      return { ...state, isLoading: true };
  
    case REQUEST_SHOW_MILHAO_SUCESS:
      return { ...state,
        isLoading: false,
        // key:
      };
  
    case REQUEST_SHOW_MILHAO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
    }
  };
  
  export default questions;
