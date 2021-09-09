import { fetchToken } from '../../API/fetch';

export const FETCHING_TOKEN = 'FETCHING_TOKEN';
export const REGISTER_USER = 'REGISTER_USER';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_ERROR_TOKEN = 'SAVE_ERROR_TOKEN';

export const RESET_GAME_STATE = 'RESET_GAME_STATE';
export const FETCHING_QUESTIONS = 'FETCHING_QUESTIONS';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_ERROR_QUESTIONS = 'SAVE_ERROR_QUESTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_RANKING = 'UPDATE_RANKING';

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
