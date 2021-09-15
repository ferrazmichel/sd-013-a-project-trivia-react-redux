import { CONFIG } from '../actions';

const INITIAL_STATE = {
  category: '',
  type: '',
  difficulty: '',
};
const saveSettings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CONFIG:
    return { ...state,
      category: action.payload.trivia_category,
      type: action.payload.trivia_type,
      difficulty: action.payload.trivia_difficulty,
    };
  default:
    return state;
  }
};

export default saveSettings;
