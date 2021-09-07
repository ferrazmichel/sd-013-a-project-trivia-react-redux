export const ADD_USER = 'ADD_USER';
export const SUCCESS_TYPE = 'SUCCESS_TYPE';
export const ERROR_TYPE = 'ERROR_TYPE';

export const getUserData = (userData) => ({
  type: ADD_USER,
  userData,
});
