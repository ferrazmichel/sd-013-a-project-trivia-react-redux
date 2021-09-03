export const USER_INFO = 'SEND_USER_EMAIL';
export const USER_TRIVIA = 'SEND_USER_EMAIL';

export const sendUserInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export const sendUserTrivia = (payload) => ({
  type: USER_TRIVIA,
  payload,
});
