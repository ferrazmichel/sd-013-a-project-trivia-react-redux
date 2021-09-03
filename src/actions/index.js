export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_API = 'RECEIVE_API';

export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });
export const requestApiLoading = () => ({ type: REQUEST_API });
export const receiveApi = (token, data) => ({
  type: RECEIVE_API,
  data,
  token,
});

export function requestApi(token) {
  return async (dispatch) => {
    try {
      dispatch(requestApiLoading());
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      dispatch(receiveApi(data));
    } catch (error) {
      console.log(error);
    }
  };
}
