import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS,
  GET_QUESTIONS_FAIL, GET_TOKEN_SUCCESS } from '../actions/actionType';

const INITIAL_STATE = {
  isLoading: true,
  erro: null,
  questions: '',
  token: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, isLoading: true };

  case GET_QUESTIONS_SUCCESS:
    return { ...state, questions: action.payload, isLoading: false };

  case GET_QUESTIONS_FAIL:
    return { ...state,
      isLoading: false,
      erro: 'Problema para carregar as perguntas',
    };

  case GET_TOKEN_SUCCESS:
    return { ...state,
      token: action.payload };

  default:
    return state;
  }
};

export default game;
