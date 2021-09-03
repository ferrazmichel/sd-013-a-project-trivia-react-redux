export const PLAYER_LOGGED_IN = 'player/login';

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
