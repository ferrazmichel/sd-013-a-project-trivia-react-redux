const EMPTY_KEY = [];
export const fetchAPI = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((data) => data.json())
  .then((response) => response);

export const TokenApi = () => fetchAPI().then((data) => {
  localStorage.setItem('token', data.token);
  return data.response_message;
});

export const saveToLocalStorage = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const loadFromLocalStorage = (key) => (
  key === 'token' ? localStorage.getItem(key)
    : JSON.parse(localStorage.getItem(key)) || EMPTY_KEY);

export const fetchURL = async (url) => {
  const requestURL = await fetch(url);
  const answer = await requestURL.json();
  return (answer);
};

export const insertAtRank = (ranking, currPlayer) => {
  const NOT_FOUND = -1;
  const insertAtIndex = ranking.findIndex(({ score }) => score < currPlayer.score);
  if (insertAtIndex === NOT_FOUND) {
    ranking.push(currPlayer);
  } else {
    ranking.splice(insertAtIndex, 0, currPlayer);
  }
};
