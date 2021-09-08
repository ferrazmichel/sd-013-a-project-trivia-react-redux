import { fetchToken } from '../../API/api';

export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_ERROR_TOKEN = 'SAVE_ERROR_TOKEN';

export const saveToken = (payload) => ({
  type: SAVE_TOKEN,
  payload,
});

export const saveErrorToken = (payload) => ({
  type: SAVE_ERROR_TOKEN,
  payload,
});

const getToken = (userInfo) => (
  async (dispatch) => {
    // dispatch(resetGameState());
    // dispatch(registerUser(userInfo));
    const lsData = JSON.stringify({ player: { ...userInfo, assertions: 0, score: 0 } });
    localStorage.state = lsData;
    // dispatch(isFetchingToken());
    try {
      const json = await fetchToken();
      localStorage.token = json.token;
      return dispatch(saveToken(json.token));
    } catch ({ message }) {
      return dispatch(saveErrorToken(message));
    }
  }
);

export default getToken;
