// importar as actions
import {
  LOGIN_SUBMIT,
} from '../actions';
// declarar o estado inicial
const initialState = {
  playerName: '',
  playerEmail: '',
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
  default:
    return state;
  }
}

export default playerReducer;
