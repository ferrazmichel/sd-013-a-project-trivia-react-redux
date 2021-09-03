import {
  START_FETCH,
  FINISH_FETCH,
  API_URL_TOKEN,
  REGISTER_USER,
  API_URL } from '../../constants';

export const startFetch = () => ({
  type: START_FETCH,
});

export const finishFetch = (payload) => ({
  type: FINISH_FETCH,
  payload,
});

export const registerUser = (payload) => ({
  type: REGISTER_USER,
  payload,
});

export const fetchData = () => (
  async (dispatch) => {
    dispatch(startFetch());

    try {
      console.log(registerUser({ teste: 'oi', teste2: 'a' }));
      const response = await fetch(API_URL_TOKEN);
      const data = await response.json();
      const { token } = await data;
      localStorage.setItem('token', token);

      const finishResponse = await fetch(API_URL(token));
      const finishData = await finishResponse.json();

      dispatch(finishFetch(finishData));
    } catch (error) {
      throw new Error(error);
    }
  }
);
