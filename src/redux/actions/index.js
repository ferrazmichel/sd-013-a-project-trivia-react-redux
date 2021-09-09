import { apiToken, apiPerguntas } from '../../services';

export const LOGIN_SUBMIT = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_PERGUNTAS = 'SAVE_PERGUNTAS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const REQUEST_PERGUNTAS = 'REQUEST_PERGUNTAS';
export const TIME_FINISHED = 'TIME_FINISHED';
export const REGISTER_GRAVATAR = 'REGISTER_GRAVATAR';

export const loginSubmit = (object) => ({ type: LOGIN_SUBMIT, payload: object });
export const requestApi = () => ({ type: REQUEST_API });
export const saveToken = (token) => ({ type: SAVE_TOKEN, payload: token });
export const savePerguntas = (results) => ({ type: SAVE_PERGUNTAS, payload: results });
export const failedRequest = (msg) => ({ type: REQUEST_FAIL, error: msg });
export const requestPerguntas = () => ({
  type: REQUEST_PERGUNTAS,
});
export const timeFinished = (booleano) => ({ type: TIME_FINISHED, payload: booleano });

export const registerGravatar = (gravatar) => ({
  type: REGISTER_GRAVATAR,
  gravatar,
});
// Encadeamento de actions de forma assíncrona
export const fetchDados = () => async (dispatch) => {
  dispatch(requestApi());
  try {
    const { token } = await apiToken();
    dispatch(saveToken(token));
    localStorage.setItem('token', token);
    dispatch(requestPerguntas());
    const { results } = await apiPerguntas(token);
    dispatch(savePerguntas(results));
  } catch (e) {
    dispatch(failedRequest('Não foi encontrado'));
  }
};
