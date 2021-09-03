export const fetchAPI = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((data) => data.json())
  .then((response) => response);

export const TokenApi = () => {
  fetchAPI().then(({ token }) => localStorage.setItem('token', token));
};

export const saveToLocalStorage = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const loadFromLocalStaorage = (key) => (
  JSON.parse(localStorage.getItem(key))
);
