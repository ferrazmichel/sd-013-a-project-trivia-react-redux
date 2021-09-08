import {
  START_FETCH,
  FINISH_FETCH,
  API_URL_TOKEN,
  REGISTER_USER,
  API_URL,
  NEXT_QUESTION,
  UPDATE_SCORE,
  DISABLE_ANSWER,
} from '../../constants';

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

export const disableAnswer = () => ({
  type: DISABLE_ANSWER,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const fetchData = () => (
  async (dispatch) => {
    dispatch(startFetch());

    try {
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
