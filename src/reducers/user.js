const INITIAL_STATE = {
  nome: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'login':
    return { ...state, nome: action.state.nome, email: action.state.email };
  default:
    return state;
  }
};

export default user;
