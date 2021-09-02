const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case '':
    return {};
  default:
    return state;
  }
};

export default user;
