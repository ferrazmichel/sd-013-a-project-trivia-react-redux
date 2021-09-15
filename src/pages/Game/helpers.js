export const resetQuestions = (elementName, btnName) => {
  document.getElementsByName(elementName).forEach((opt) => {
    opt.disabled = false;
    opt.className = '';
  });
  document.querySelector(btnName).classList.add('invisible');
};

export const handleSelectButtons = (correctOpt, elementName, btnName) => {
  document.getElementsByName(elementName).forEach((opt) => {
    opt.disabled = true;
    const className = opt.value === correctOpt ? 'game-correct' : 'game-incorrect';
    opt.classList.add(className);
  });
  document.querySelector(btnName).classList.remove('invisible');
};

export const handleScore = (difficulty, seconds) => {
  const lsData = JSON.parse(localStorage.state);
  const diff = ['batata', 'easy', 'medium', 'hard'];
  const diffMultiplier = diff.indexOf(difficulty);
  const basePoints = 10;

  lsData.player.assertions += 1;
  lsData.player.score += basePoints + seconds * diffMultiplier;
  localStorage.state = JSON.stringify(lsData);
  return { score: lsData.player.score, assertions: lsData.player.assertions };
};
