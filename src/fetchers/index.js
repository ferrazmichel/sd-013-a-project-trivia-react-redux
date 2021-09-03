const fetchQuestions = async () => {
  const token = localStorage.getItem('token');
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await request.json();

  return data;
};

export default fetchQuestions;
