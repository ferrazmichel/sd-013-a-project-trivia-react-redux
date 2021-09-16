const SHOW_API = 'https://opentdb.com/api_token.php?command=request';

export const getShowMilhao = () => (
  fetch(SHOW_API)
    .then((response) => (
      response
        .json()
        .then((token) => (response.ok ? Promise.resolve(token) : Promise.reject(token)))
    ))
);

export const getQuestionsApi = async (token) => {
    const results = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await results.json();
    return json;
  };
