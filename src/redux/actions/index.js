// const TOKEN = 'TOKEN';

// const tokenAction = () => ({
//   type: TOKEN,
//   payload,
// });

// export default tokenAction;

export const SAVE_LOGIN = 'SAVE_LOGIN';

export const saveLogin = (name, email) => ({
  type: SAVE_LOGIN,
  name,
  email,
});
