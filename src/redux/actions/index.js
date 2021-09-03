import { apiToken, apiPerguntas } from '../../services';

export const LOGIN_SUBMIT = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_PERGUNTAS = 'SAVE_PERGUNTAS';
export const REQUEST_FAIL = 'REQUEST_FAIL';

export const loginSubmit = (object) => ({ type: LOGIN_SUBMIT, payload: object });
export const requestApi = () => ({ type: REQUEST_API });
export const saveToken = (token) => ({ type: SAVE_TOKEN, payload: token });
export const savePerguntas = (results) => ({ type: SAVE_PERGUNTAS, payload: results });
export const failedRequest = (msg) => ({ type: REQUEST_FAIL, error: msg });

// Encadeamento de actions de forma assíncrona
export const fetchDados = () => async (dispatch) => {
  dispatch(requestApi());
  try {
    const { token } = await apiToken();
    dispatch(saveToken(token));
    localStorage.setItem('token', token);
    const { results } = await apiPerguntas(token);
    dispatch(savePerguntas(results));
  } catch (e) {
    dispatch(failedRequest('Não foi encontrado'));
  }
};
