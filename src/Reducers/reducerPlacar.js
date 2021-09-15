import { SET_PLACAR } from '../Actions';

const INITIAL_STATE = {
  i: 0,
  assertions: 0,
  score: 0,
};

const reducerPlacar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLACAR:
    return ({
      ...state,
      i: action.payLoad.i,
      assertions: action.payLoad.assertions,
      score: action.payLoad.score,
    });
  default:
    return state;
  }
};

export default reducerPlacar;
