export const ADD_USER = 'ADD_USER';
export const SUCCESS_TYPE = 'SUCCESS_TYPE';
export const ERROR_TYPE = 'ERROR_TYPE';

export const getUserData = (userData) => ({
  type: ADD_USER,
  userData,
});

export const successAction = (payload) => ({
  type: SUCCESS_TYPE,
  payload,
});

export const errorAction = (payload) => ({
  type: ERROR_TYPE,
  payload,
});

export const fetchName = () => async (dispatch) => {
  dispatch(loadingAction());
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    return dispatch(successAction(data));
  } catch (error) {
    return dispatch(errorAction(error.message));
  }
};
