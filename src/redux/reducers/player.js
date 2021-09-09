// importar as actions
import {
  LOGIN_SUBMIT,
  TIME_FINISHED,
} from '../actions';
// declarar o estado inicial
const initialState = {
  playerName: '',
  playerEmail: '',
  boolTimeout: false,
};

// função pura (reducer)
function playerReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN_SUBMIT:
    return {
      ...state,
      playerName: action.payload.playerName,
      playerEmail: action.payload.playerEmail,
    };
  case TIME_FINISHED:
    return {
      ...state,
      boolTimeout: action.payload,
    };
  default:
    return state;
  }
}

export default playerReducer;
