import { SET_LOCAL_STORAGE } from '../Actions';

const INITIAL_STATE = {
  player: {
    name: ',',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const reducerStorage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_LOCAL_STORAGE:
    return ({
      ...state,
      name: action.payLoad.name,
      assertions: action.payLoad.assertions,
      score: action.payLoad.score,
      gravatarEmail: action.payLoad.gravatarEmail,

    });
  default:
    return state;
  }
};

export default reducerStorage;
