import md5 from 'crypto-js/md5';

export const generateGravatar = (
  email,
) => `https://www.gravatar.com/avatar/${md5(email).toString()}`;

export const validateEmail = (email) => {
  const pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
};
