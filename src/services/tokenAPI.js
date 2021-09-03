const TOKEN_REQUEST = 'https://opentdb.com/api_token.php?command=request';

const fetchToke = async () => {
  const fetchAPI = await fetch(TOKEN_REQUEST);
  const data = await fetchAPI.json();
  return data;
};

export default fetchToke;
