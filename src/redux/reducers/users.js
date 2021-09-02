const INITIAL_STATE = {
  email: '',
  name: '',
};

export const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case '':
    return '';
  default:
    return state;
  }
};

export default player;
