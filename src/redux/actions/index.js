import fetchQuestions from '../services/fetchQuestions';
import getTokenApi from '../services/fetchToken';

export const USER_INFO = 'SEND_USER_EMAIL';
// export const QUESTIONS_TRIVIA = 'QUESTIONS_TRIVIA';
export const FAIL_TRIVIA = 'FAIL_TRIVIA';
export const LOAD_TRIVIA = 'LOAD_TRIVIA';
export const SUCESS_TRIVIA = 'SUCESS_TRIVIA';

export const sendUserInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export const failQuestions = (payload) => ({
  type: FAIL_TRIVIA,
  payload,
});

export const loadQuestions = () => ({
  type: LOAD_TRIVIA,
});

export const sucessQuestions = (payload) => ({
  type: SUCESS_TRIVIA,
  payload,
});

// export const sendQuestions = (payload) => ({
//   type: QUESTIONS_TRIVIA,
//   payload,
// });

export const fetchApiQuestions = () => async (dispatch) => {
  let token = localStorage.getItem('token');
  if (!localStorage[token]) {
    token = await getTokenApi();
  }
  dispatch(loadQuestions());
  return fetchQuestions()
    .then(
      (data) => {
        const failCode = 3;
        if (data.response_code === 0) {
          return dispatch(sucessQuestions(data.results));
        } if (data.response_code === failCode) {
          fetchApiQuestions();
        }
      },
      (error) => dispatch(failQuestions(error)),
    );
};
