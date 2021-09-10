const INITIAL_STATE = {
  score: 0,
  count: 30,
};

function ScoreReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_SCORE':
    return ({
      ...state,
      score: action.score,
    });
  case 'AWAIT':
    return ({
      ...state,
    });
  case 'ADD_CURRENT_COUNT':
    return ({
      ...state,
      count: action.count,
    });
  default:
    return state;
  }
}

export default ScoreReducer;
