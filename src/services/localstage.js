export const scorelocalStorage = () => {
  const score = JSON.parse(localStorage.getItem('state'));
  return score.player.score;
};

export const assertionsLocalStorage = () => {
  const assertions = JSON.parse(localStorage.getItem('state'));
  return assertions.player.assertions;
};
