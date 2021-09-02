import {
  IS_LOADING_SHOW_MILHAO,
  REQUEST_SHOW_MILHAO_SUCESS,
  REQUEST_SHOW_MILHAO_FAILED,
} from './actionsTypes';

const isLoadShowMilhao = () => ({ type: IS_LOADING_SHOW_MILHAO });
const requestShowMilhaoSucess = (payload) => ({
  type: REQUEST_SHOW_MILHAO_SUCESS, payload });
const requestShowMilhaofailed = (error) => ({ type: REQUEST_SHOW_MILHAO_FAILED, error });

const showMilhaoAPI = () => async (dispatch) => {
  try {
    dispatch(isLoadShowMilhao());
    const results = await getShowMilhao();
    dispatch(requestShowMilhaoSucess(results));
  } catch (error) {
    dispatch(requestShowMilhaofailed(error));
  }
};

export default showMilhaoAPI;
