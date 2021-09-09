import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS,
  GET_QUESTIONS_FAIL, GET_TOKEN_SUCCESS, SET_PLAYER, SET_SCORE,
} from '../actions/actionType';
import { setLocalStorage } from '../../services/localStoreService';

const INITIAL_STATE = {
  isLoading: true,
  erro: null,
  questions: '',
  token: '',
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
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

  case SET_PLAYER:
    setLocalStorage('state', { player: { ...state.player, ...action.payload } });
    return { ...state, player: { ...state.player, ...action.payload } };

  case SET_SCORE:
    setLocalStorage('state', { player: {
      ...state.player, score: state.player.score + action.payload,
    } });
    return { ...state,
      player: {
        ...state.player, score: state.player.score + action.payload,
      } };

  default:
    return state;
  }
};

export default game;
