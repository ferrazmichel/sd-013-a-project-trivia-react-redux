import fetchTriviaAPI from './triviaAPI';

const fetchQuestions = async (token, configs) => {
  const EXPIRED_CODE = 3; // Se for um token inválido é retornado código 3 na resposta
  const { category, difficulty, type } = configs;
  const END_POINT = `https://opentdb.com/api.php?amount=5&token=${token}&category=${category}&difficulty=${difficulty}&type=${type}`;
  const fetchQuestion = await fetch(END_POINT);
  const response = await fetchQuestion.json();
  const { results } = response;

  if (response.response_code === EXPIRED_CODE) return 'token failure';

  return results; // retorna um array com as questões, cada elemento do array é um objeto
};

const mountQuestions = async (configs) => {
  let token = localStorage.getItem('token');

  if (!token) {
    fetchTriviaAPI();
    token = localStorage.getItem('token');
  }

  let mountedQuestions = await fetchQuestions(token, configs);

  if (mountedQuestions === 'token failure') {
    fetchTriviaAPI();
    token = localStorage.getItem('token');
    mountedQuestions = await fetchQuestions(token, configs);
  }

  return mountedQuestions;
};

export default mountQuestions;
