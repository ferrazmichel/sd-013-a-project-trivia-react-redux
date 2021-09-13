export const USER_INFO = 'USER_INFO';
export const PLAYER_INFO = 'PLAYER_INFO';
export const RANKING_INFO = 'RANKING_INFO';

export const sendUserInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export const sendPlayerInfo = (payload) => ({
  type: PLAYER_INFO,
  payload,
});

export const sendRankingInfo = (payload) => ({
  type: RANKING_INFO,
  payload,
});
