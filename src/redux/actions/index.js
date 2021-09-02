import { REQUEST_API, SAVE_USER } from './actionTypes';

export const saveUser = (email, name) => ({
  type: SAVE_USER,
  email,
  name,
});

export const requestApi = () => ({
  type: REQUEST_API,
});
