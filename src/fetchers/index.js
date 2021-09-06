const TRIVIA_TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

/**
 * De acordo com: https://opentdb.com/api_config.php
 */
const responseCodes = {
  SUCCESS: 0,
  TOKEN_NOT_FOUND: 3,
};

export const fetchToken = async () => {
  try {
    const response = await fetch(TRIVIA_TOKEN_URL);
    const data = await response.json();
    const { token } = data;

    // Conforme https://opentdb.com/api_config.php
    if (data.response_code === responseCodes.SUCCESS) {
      localStorage.setItem('token', token);
      return token;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchQuestions = async () => {
  let token = localStorage.getItem('token');
  if (!localStorage[token]) {
    token = await fetchToken();
  }
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await request.json();

  if (data.response_code === responseCodes.SUCCESS) {
    return data.results;
  } if (data.response_code === responseCodes.TOKEN_NOT_FOUND) {
    fetchQuestions();
  }
};
