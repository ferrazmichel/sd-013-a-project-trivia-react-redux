export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export const saveEmail = (payload) => (
  { type: SAVE_EMAIL, payload }
);

export const saveQuestion = (payload) => (
  { type: SAVE_QUESTION, payload }
);
