export const resetButtons = (elementName, btnName) => {
  const btns = document.getElementsByName(elementName);
  btns.forEach((btn) => {
    btn.disabled = true;
  });
  document.querySelector(btnName).classList.remove('invisible');
};

export const decode = (str) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = str;
  return textArea.value;
};

export const shuffleOptions = (arr) => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
