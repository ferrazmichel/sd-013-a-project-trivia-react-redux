const TRIVIA_URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const getTokenApi = async () => {
  try {
    const response = await fetch(TRIVIA_URL_TOKEN); // requisito 2
    const dataToken = await response.json();
    const request = dataToken.response_code === 0; // Sucesso na requisição.
    if (request) {
      localStorage.setItem('token', dataToken.token);
    }
  } catch (error) {
    console.log(error);
  }
};

export default getTokenApi;
