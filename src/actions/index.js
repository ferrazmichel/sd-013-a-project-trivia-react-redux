export const PLAYER_LOGGED_IN = 'player/login';
export const REQUEST_QUESTIONS = 'match/request_questions';
export const GET_QUESTIONS = 'match/get_questions';

// Action disparada no momento do login. Após os dados terem sido validados.
export const userLoggedIn = (playerInfo) => (
  // `payload` é um objeto contendo as informações do usuário logado:
  // {
  //   name: 'Fulana da Silva',
  //   gravatarEmail: 'fulana@mail.com',
  // }
  {
    type: PLAYER_LOGGED_IN,
    payload: playerInfo,
  }
);

export const requestQuestions = (questions) => ({
  type: REQUEST_QUESTIONS,
  payload: questions,
});

export const getQuestionsFromResponse = (data) => ({
  type: GET_QUESTIONS,
  payload: data.results, // Array contendo as 5 questões
});
