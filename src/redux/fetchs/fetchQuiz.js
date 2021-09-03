import {
  actionFetchingQuiz,
  actionGetQuiz,
} from '../actions/index';

const decodeResults = (questions) => {
  const decoded = questions
    .map(({
      category,
      type,
      difficulty,
      question,
      correct_answer: correct,
      incorrect_answers: incorrects,
    }) => ({
      category: atob(category),
      type: atob(type),
      difficulty: atob(difficulty),
      question: atob(question),
      correct_answer: atob(correct),
      incorrect_answers: incorrects.map((incorrect) => atob(incorrect)),
    }));
  return decoded;
};

const fetchQuiz = ({ token, amount, id, difficulty, type }) => {
  const types = { 'multiple choice': 'multiple', 'true/false': 'boolean' };
  const typeSelected = type === 'any type' ? '' : `&type=${types[type]}`;
  const diffSelected = difficulty === 'any difficulty' ? '' : `&difficulty=${difficulty}`;
  console.log('amount', amount);
  const URL = `https://opentdb.com/api.php?category=${id}${diffSelected}${typeSelected}&amount=${amount}&token=${token}&encode=base64`;
  console.log('url', URL);

  return async (dispatch) => {
    dispatch(actionFetchingQuiz());
    const response = await fetch(URL);
    const { results } = await response.json();
    console.log('results:', results);
    dispatch(actionGetQuiz(decodeResults(results)));
  };
};

export default fetchQuiz;
