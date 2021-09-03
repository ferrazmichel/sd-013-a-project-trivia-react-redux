const fetchTriviaAPI = async () => {
  const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = fetchAPI.json();

  return response;
};

export default fetchTriviaAPI;
