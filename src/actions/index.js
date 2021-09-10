export const PLAYER_LOGGED_IN = 'player/login';
export const SCORE_UPDATED = 'player/score_updated';
export const REQUEST_QUESTIONS = 'match/request_questions';
export const GET_QUESTIONS = 'match/get_questions';
export const ENABLE_NEXT_QUESTION = 'match/enable_button';
export const UPDATE_TIME = 'UPDATE_TIME';
export const TIMER_TOGLE = 'TIMER_TOGLE';

// Action disparada no momento do login. Após os dados terem sido validados.
export const userLoggedIn = (playerInfo) => (
  // `payload` é um objeto contendo as informações do usuário logado:
  // {
  //   name: 'Fulana da Silva',
  //   gravatarEmail: 'fulana@mail.com',
  // }
  // Será utilizado em reducers/player.js da seguinte forma:
  // name: action.payload.name,
  // gravatarEmail: action.payload.gravatarEmail,
  {
    type: PLAYER_LOGGED_IN,
    payload: playerInfo,
  }
);

export const getQuestionsFromResponse = (questions) => ({
  type: GET_QUESTIONS,
  payload: questions, // Array contendo as 5 questões
});

export const toggleNextButton = (bool) => ({
  type: ENABLE_NEXT_QUESTION,
  payload: bool,
});

export const updateScore = (score) => ({
  type: SCORE_UPDATED,
  payload: score,
});

export const updateTime = (time) => ({
  type: UPDATE_TIME,
  payload: time,
});

export const timerToggle = (bool) => ({
  type: TIMER_TOGLE,
  payload: bool,
});
