export const SET_LOGIN = 'SET_LOGIN';

export const setLogin = (payLoad) => ({
  type: SET_LOGIN,
  payLoad,
});

export const SET_QUESTIONS = 'SET_QUESTIONS';

export const setQuestions = (payLoad) => ({
  type: SET_QUESTIONS,
  payLoad,
});

export const SET_LOCAL_STORAGE = 'SET_LOCAL_STORAGE';

export const setLocalStorage = (payload) => ({
  type: SET_LOCAL_STORAGE,
  payload,
});
