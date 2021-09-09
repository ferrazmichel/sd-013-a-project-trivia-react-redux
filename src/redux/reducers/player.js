// Este reducer foi depreciado

import { ADD_USER } from '../actions';

const initialState = {
  gravatarEmail: '',
  name: '',
};

function player(state = initialState, action) {
  switch (action.type) {
  case ADD_USER:
    return { ...state, gravatarEmail: action.userData.email, name: action.userData.name };

  default:
    return state;
  }
}

export default player;

// Este reducer foi depreciado
