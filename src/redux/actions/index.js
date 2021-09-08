export const ADD_USER = 'ADD_USER';
export const SUCCESS_TYPE = 'SUCCESS_TYPE';
export const ERROR_TYPE = 'ERROR_TYPE';
export const GAME_SETTINGS = 'GAME_SETTINGS';

export const getUserData = (userData) => ({
  type: ADD_USER,
  userData,
});
// Criando action creator changeSettings
// Com o type igual a const e com parâmetro thisConfig
export const changeSettings = (thisConfig) => ({
  type: GAME_SETTINGS,
  thisConfig,
});
