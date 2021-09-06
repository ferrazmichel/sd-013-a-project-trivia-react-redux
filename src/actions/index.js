import { getQuestionsApi, getShowMilhao } from '../services/showMilhaoAPI';
import {
  IS_LOADING_SHOW_MILHAO,
  REQUEST_SHOW_MILHAO_SUCESS,
  IS_LOADING_QUESTIONS_SHOW,
  REQUEST_QUESTIONS_SHOW_SUCESS,
  REQUEST_FAILED,
  SAVE_INFO_PLAYER,
} from './actionsTypes';

export const infoPlayer = (email, nickname) => ({
  type: SAVE_INFO_PLAYER, email, nickname,
});

const isLoadShowMilhao = () => ({ type: IS_LOADING_SHOW_MILHAO, loading: true });

const requestShowMilhaoSucess = (token) => ({
  type: REQUEST_SHOW_MILHAO_SUCESS, token,
});

const requestFailed = (error) => ({
  type: REQUEST_FAILED, error,
});

export const showMilhaoAPI = () => async (dispatch) => {
  try {
    dispatch(isLoadShowMilhao());
    const token = await getShowMilhao();
    dispatch(requestShowMilhaoSucess(token));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

const isLoadingQuestions = () => ({ type: IS_LOADING_QUESTIONS_SHOW, loading: true });

const requestQuestionsSucess = (payload) => ({
  type: REQUEST_QUESTIONS_SHOW_SUCESS, payload,
});

export const questionsShowMilhao = (token) => async (dispatch) => {
  try {
    dispatch(isLoadingQuestions());
    const questions = await getQuestionsApi(token);
    dispatch(requestQuestionsSucess(questions));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};
