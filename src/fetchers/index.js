const TRIVIA_TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
const TRIVIA_QUESTIONS_URL = 'https://opentdb.com/api.php?amount=5';

/**
 * De acordo com: https://opentdb.com/api_config.php
 */
const responseCodes = {
  SUCCESS: 0,
  TOKEN_NOT_FOUND: 3,
};

/**
 * @returns Um token que pode estar expirado ou não.
 * @throws Loga um erro no console em caso de falha ao executar o fetch.
 */
export const fetchToken = async () => {
  const browserStoredToken = localStorage.getItem('token');
  if (browserStoredToken) return browserStoredToken;

  try {
    const response = await fetch(TRIVIA_TOKEN_URL);
    const data = await response.json();
    console.log(data.response_code, 'response_code');
    // Conforme https://opentdb.com/api_config.php
    if (data.response_code === responseCodes.SUCCESS) {
      const { token } = data;
      localStorage.setItem('token', token);
      return token;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchQuestions = async () => {
  const token = await fetchToken(); // Pode ser um já armazenado no navegador ou um novo

  const request = await fetch(`${TRIVIA_QUESTIONS_URL}&token=${token}`);
  const data = await request.json();

  if (data.response_code === responseCodes.SUCCESS) return data.results;

  if (data.response_code === responseCodes.TOKEN_NOT_FOUND) {
    localStorage.removeItem('token'); // Apaga o token expirado
    fetchQuestions(); // Pega um novo token e repete a requisição das questions
  }
};
