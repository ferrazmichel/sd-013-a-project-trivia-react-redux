import md5 from 'crypto-js/md5';

const fetchAvatar = (email) => {
  const convertedEmail = md5(email).toString();
  return `https://www.gravatar.com/avatar/${convertedEmail}`;
};

export default fetchAvatar;
