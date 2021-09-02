const SHOW_API = 'https://opentdb.com/api_token.php?command=request';

const getShowMilhao = () => (
  fetch(SHOW_API)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getShowMilhao;
