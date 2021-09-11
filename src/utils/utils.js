import md5 from 'crypto-js/md5';

export const fetchAvatar = (email) => {
  const convertedEmail = md5(email).toString();
  return `https://www.gravatar.com/avatar/${convertedEmail}`;
};

export const getTriviaApi = async (token,
  category = '0', difficulty = '0', type = '0') => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`);
  const json = await response.json();
  return json.results;
};
