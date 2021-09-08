// const TOKEN = 'TOKEN';

// const tokenAction = () => ({
//   type: TOKEN,
//   payload,
// });

// export default tokenAction;

export const SAVE_LOGIN = 'SAVE_LOGIN';

export const LOADING_TRUE = 'LOADING_TRUE';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';
export const REQUEST_FAIL = 'REQUEST_FAIL';

export const saveLogin = (name, email) => ({
  type: SAVE_LOGIN,
  name,
  email,
});

const requestQuestions = () => ({ type: LOADING_TRUE });

const getQuestions = (payload) => ({
  type: REQUEST_COMPLETE,
  questions: payload,
});

const requestError = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const fetchQuestions = (userToken) => async (dispatch) => {
  try {
    dispatch(requestQuestions());

    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${userToken}`);
    const questions = await response.json();

    dispatch(getQuestions(questions));
  } catch (error) {
    dispatch(requestError(error));
  }
};
