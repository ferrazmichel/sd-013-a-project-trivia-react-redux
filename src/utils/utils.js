import md5 from 'crypto-js/md5';

export const fetchAvatar = (email) => {
  const convertedEmail = md5(email).toString();
  return `https://www.gravatar.com/avatar/${convertedEmail}`;
};

export const getTriviaApi = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();
  return json.results;
};
