export const SAVE_AVATAR = 'SAVE_AVATAR';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';
export const GET_TOKEN_FAIL = 'GET_TOKEN_FAIL';

export const saveAvatar = (link, user) => ({
  type: SAVE_AVATAR,
  link,
  user,
});

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

// export const errorAvatar = (payload) => ({
//   type: ERROR_AVATAR,
//   payload,
// });

export const fetchAvatar = (hash, user) => (dispatch) => {
  const avatar = `https://www.gravatar.com/avatar/${hash}`;
  return dispatch(saveAvatar(avatar, user));
};

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
