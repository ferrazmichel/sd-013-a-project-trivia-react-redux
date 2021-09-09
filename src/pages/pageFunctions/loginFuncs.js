// fetch api functions
const saveTokenOnLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const fetchTokenApi = async () => {
  const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonFetch = await fetchApi.json();
  const { token } = await jsonFetch;

  saveTokenOnLocalStorage(token);
};

// validate login functions

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateUsername = (name) => name.length > 1;

export const savePlayerDataOnLocalStorage = (state) => {
  const { name, email, score } = state;
  const user = { name, email, score };
  localStorage.setItem('player', JSON.stringify(user));
};

export const validateLoginFactory = (email, name) => (
  validateEmail(email) && validateUsername(name)
);
