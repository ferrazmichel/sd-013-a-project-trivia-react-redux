import FetchAPI from '../services/fetchAnswers';
import {
  getUser,
  fetchAPI,
  fetchAPIERROR,
  fetchAPISUCESS,
  SET_TIMER,
} from './actionTypes';

export const ActionEmail = ({ email, nome }) => ({
  type: getUser,
  email,
  nome,
});

export const Fetching = () => ({
  type: fetchAPI,
});

export const FetchingSUCESS = (payload) => ({
  type: fetchAPISUCESS,
  payload,
});

export const FetchingERROR = () => ({
  type: fetchAPIERROR,
});

export const FecthAPI = () => (dispatch) => {
  dispatch(Fetching());
  return FetchAPI()
    .then(
      (payload) => dispatch(FetchingSUCESS(payload)),
      () => dispatch(fetchAPIERROR()),
    );
};

export const setTimer = (timer) => ({
  type: SET_TIMER,
  timer,
});
