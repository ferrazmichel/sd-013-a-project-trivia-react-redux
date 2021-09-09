const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'score':
    return {
      ...state,
      score: action.state.score,
      assertions: action.state.assertions,
    };
  default:
    return state;
  }
};

export default game;
