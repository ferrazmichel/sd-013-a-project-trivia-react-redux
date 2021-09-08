const INITIAL_STATE = {
  score: 0, 
};


const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'score':
    return {...state,score:action.state};
  default:
    return state;
  }
};

export default game;
