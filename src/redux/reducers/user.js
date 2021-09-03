
import { ActionCreators } from "redux-devtools-instrument";
import { ADD_USER } from "../actions";

const initialState = {
  name: '',
  email: '',
};

function user(state = initialState, { type, payload }) {
  switch (type) {
  case ADD_USER:
    return { ...state, name: action.userData.name, action.userData.email };   
  
  default:
    return state;
  }
}

export default user;
