const API_URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const apiToken = () => fetch(API_URL_TOKEN)
  .then((responseToken) => (
    responseToken
      .json()
      .then((json) => (responseToken.ok ? Promise.resolve(json)
        : Promise.reject(json)))
  ));

export const apiPerguntas = (token) => {
  const API_URL_DATA = `https://opentdb.com/api.php?amount=5&token=${token}`;
  console.log(API_URL_DATA);
  return fetch(API_URL_DATA)
    .then((responsePerguntas) => (
      responsePerguntas
        .json()
        .then((json) => (responsePerguntas.ok ? Promise.resolve(json)
          : Promise.reject(json)))
    ));
};
