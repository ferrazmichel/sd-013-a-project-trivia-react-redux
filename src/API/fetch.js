export const fetchToken = async () => {
  const res = await fetch('https://opentdb.com/api_token.php?command=request');
  if (!res.ok) throw new Error('Failed to generate session token');
  return res.json();
};

export const fetchQuestions = async (token) => {
  const res = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  if (!res.ok) throw new Error('Failed to generate session token');
  return res.json();
};
