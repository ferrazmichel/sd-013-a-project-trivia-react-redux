// Esse reducer será responsável por tratar o todas as informações relacionadas aos jogos
import {
  fetchAPI,
  fetchAPIERROR,
  fetchAPISUCESS,
  SET_TIMER,
} from '../actions/actionTypes';

const INITIAL_API_STATE = {
  isLoading: true,
  erro: null,
  answer: {},
  timer: 30,
};

const Fetching = (state = INITIAL_API_STATE, action) => {
  switch (action.type) {
  case fetchAPI:
    return { ...state, isLoading: true };

  case fetchAPISUCESS:
    return { ...state,
      isLoading: false,
      answer: action.payload.results,
    };

  case fetchAPIERROR:
    return {
      ...state,
      isLoading: false,
      erro: 'DEU RUIM',
    };

  case SET_TIMER:
    return {
      ...state,
      timer: action.timer,
    };

  default:
    return state;
  }
};

export default Fetching;
