import { fetchQuestions, fetchToken } from '../../API/fetch';

export const FETCHING_TOKEN = 'FETCHING_TOKEN';
export const REGISTER_USER = 'REGISTER_USER';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_ERROR_TOKEN = 'SAVE_ERROR_TOKEN';

export const FETCHING_QUESTIONS = 'FETCHING_QUESTIONS';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_ERROR_QUESTIONS = 'SAVE_ERROR_QUESTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const isFetchingToken = () => ({
  type: FETCHING_TOKEN,
});

export const registerUser = (payload) => ({
  type: REGISTER_USER,
  payload,
});

export const saveToken = (payload) => ({
  type: SAVE_TOKEN,
  payload,
});

export const saveErrorToken = (payload) => ({
  type: SAVE_ERROR_TOKEN,
  payload,
});

export const isFetchingQuestions = () => ({
  type: FETCHING_QUESTIONS,
});

export const tokenExpired = () => ({
  type: TOKEN_EXPIRED,
});

export const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export const saveErrorQuestions = (payload) => ({
  type: SAVE_ERROR_QUESTIONS,
  payload,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const getToken = (userInfo) => (
  async (dispatch) => {
    dispatch(registerUser(userInfo));
    const lsData = JSON.stringify({ player: { ...userInfo, assertions: 0, score: 0 } });
    localStorage.state = lsData;
    dispatch(isFetchingToken());
    try {
      const json = await fetchToken();
      localStorage.token = json.token;
      return dispatch(saveToken(json.token));
    } catch ({ message }) {
      return dispatch(saveErrorToken(message));
    }
  }
);

const expiredTokenCode = 3;

export const getQuestions = (token) => (
  async (dispatch) => {
    dispatch(isFetchingQuestions());
    try {
      const json = await fetchQuestions(token);
      if (json.response_code === expiredTokenCode) return dispatch(tokenExpired());
      return dispatch(saveQuestions(json.results));
    } catch ({ message }) {
      return dispatch(saveErrorQuestions(message));
    }
  }
);
