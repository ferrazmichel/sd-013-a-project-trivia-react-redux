import {
  ADD_QUESTIONS_ON_STORE,
} from './actionTypes';

const saveScoreOnStore = (currScore) => ({
  type: 'SAVE_SCORE',
  score: currScore,
});

export const addQuestionsOnStore = (payload) => ({
  type: ADD_QUESTIONS_ON_STORE,
  payload,
});

// function saveScoreOnStore(currScore) {
//   return (dispatch) => {
//     dispatch(saveScore(currScore));
//   };
// }

export default saveScoreOnStore;
