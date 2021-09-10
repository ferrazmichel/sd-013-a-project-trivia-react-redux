const INITIAL_STATE = {
  score: 0,
  assertions: 0,
  // email: '',
  // gravatarEmail: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'score':
    return {
      ...state,
      score: action.state.score,
      assertions: action.state.assertions,
    };
  // case 'email':
  //   return {
  //     ...state,
  //     score: action.state.email,
  //     gravatarEmail: action.state.gravatarEmail,
  //   };
  default:
    return state;
  }
};

export default game;
