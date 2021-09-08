export const fetchToken = async () => {
  const resp = await fetch('https://opentdb.com/api_token.php?command=request');
  if (!resp.ok) throw new Error('Failed');
  return resp.json();
};

export const fetchQuestions = async (token) => {
  const res = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  if (!res.ok) throw new Error('Failed');
  return res.json();
};
