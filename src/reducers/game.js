import { CLEAR_QUESTIONS, ENABLE_NEXT_QUESTION,
  GET_QUESTIONS,
  TIMER_TOGLE,
  UPDATE_TIME } from '../actions';

import shuffleArray from '../helpers';

const initialState = {
  questions: [],
  loading: true,
  answered: false,
  time: 0,
  timerIsOn: false,
};

const difficulties = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
};

const getDifficulty = (question) => {
  switch (question.difficulty) {
  case 'easy':
    return difficulties.EASY;
  case 'medium':
    return difficulties.MEDIUM;
  case 'hard':
    return difficulties.HARD;
  default:
    return false;
  }
};

const prepareQuestions = (questions) => questions.map((question) => {
  const difficulty = getDifficulty(question);
  const correctAnswer = question.correct_answer;
  const incorrectAnswers = question.incorrect_answers;
  const alternatives = incorrectAnswers
    .map((a, idx) => ({ text: a, textId: `wrong-answer-${idx}`, difficulty }));
  alternatives.push({ text: correctAnswer, textId: 'correct-answer', difficulty });
  shuffleArray(alternatives);

  const newQuestion = { ...question, alternatives };
  delete newQuestion.correct_answer;
  delete newQuestion.incorrect_answers;

  return newQuestion;
});

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_QUESTIONS: {
    const questions = prepareQuestions(action.payload);
    return { ...state, questions, loading: false };
  }
  case ENABLE_NEXT_QUESTION: {
    return { ...state, answered: action.payload };
  }
  case UPDATE_TIME:
    return {
      ...state,
      time: action.payload,
    };
  case TIMER_TOGLE:
    return {
      ...state,
      timerIsOn: action.payload,
    };
  case CLEAR_QUESTIONS:
    return {
      ...state,
      questions: [],
      loading: true,
    };
  default:
    return state;
  }
};

export default gameReducer;
