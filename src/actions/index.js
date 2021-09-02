export const LOGIN = 'LOGIN';

export const setLogin = (login, email) => ({
  type: LOGIN, login, email,
});

export default setLogin;
