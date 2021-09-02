export const SAVE_AVATAR = 'SAVE_AVATAR';

export const saveAvatar = (link, user) => ({
  type: SAVE_AVATAR,
  link,
  user,
});

// export const errorAvatar = (payload) => ({
//   type: ERROR_AVATAR,
//   payload,
// });

export const fetchAvatar = (hash, user) => (dispatch) => {
  const avatar = `https://www.gravatar.com/avatar/${hash}`;
  return dispatch(saveAvatar(avatar, user));
};
