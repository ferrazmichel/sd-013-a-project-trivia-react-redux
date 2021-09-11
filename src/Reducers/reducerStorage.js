import { SET_LOCAL_STORAGE } from '../Actions';

const INITIAL_STATE = {
  assertions: 0,
// score: 0,
};

const reducerStorage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_LOCAL_STORAGE:
    return ({
      ...state,
      // timer: action.payLoad.timer,
      assertions: action.payload.assertions,
      // score: action.payLoad.score,
    });
  default:
    return state;
  }
};

export default reducerStorage;
