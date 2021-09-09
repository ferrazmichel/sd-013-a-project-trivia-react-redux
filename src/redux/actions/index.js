import fetchQuestions from '../services/fetchQuestions';

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

export const fetchApiQuestions = () => (dispatch) => {
  dispatch(loadQuestions());
  return fetchQuestions()
    .then(
      (data) => {
        dispatch(sucessQuestions(data));
      },

      (error) => dispatch(failQuestions(error)),
    );
};
