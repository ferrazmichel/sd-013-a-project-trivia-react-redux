import { getQuestionsApi, getShowMilhao } from '../services/showMilhaoAPI';
import {
  IS_LOADING,
  REQUEST_SHOW_MILHAO_SUCESS,
  REQUEST_FAILED,
  SAVE_INFO_PLAYER,
} from './actionsTypes';

export const infoPlayer = ({ email, nickname, gravatarEmail }) => ({
  type: SAVE_INFO_PLAYER, email, nickname, gravatarEmail,

  const isLoading = () => ({ type: IS_LOADING });

  const requestShowMilhaoSucess = ({ token, questions }) => ({
    type: REQUEST_SHOW_MILHAO_SUCESS, token, questions,
});

const requestFailed = (error) => ({
  type: REQUEST_FAILED, error,
});

export const showMilhaoAPI = () => async (dispatch) => {
  try {
    dispatch(isLoading());
    const token = await getShowMilhao();
    localStorage.setItem('token', JSON.stringify(token.token));
    const questions = await getQuestionsApi(token.token);
    dispatch(requestShowMilhaoSucess({ token, questions }));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};
