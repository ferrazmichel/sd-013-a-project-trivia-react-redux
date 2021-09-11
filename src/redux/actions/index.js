export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';
export const GET_TOKEN_FAIL = 'GET_TOKEN_FAIL';
export const VALID_LOGIN = 'VALID_LOGIN';
export const SET_CONFIGS = 'SET_CONFIGS';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const getTokenSucess = (token) => ({
  type: GET_TOKEN_SUCESS,
  token,
});

export const getTokenFail = (error) => ({
  type: GET_TOKEN_FAIL,
  error,
});

export const validLogin = (name, email) => ({
  type: VALID_LOGIN,
  name,
  email,
});

export const setConfigs = (configs) => ({
  type: SET_CONFIGS,
  configs,
});

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestToken());
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const json = await response.json();
      const { token } = json;
      dispatch(getTokenSucess(token));
    } catch (error) {
      dispatch(getTokenFail(error.message));
    }
  };
}
