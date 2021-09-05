const MULTIPLE_5_QUESTIONS = 'https://opentdb.com/api.php?amount=5&type=multiple&token=';

const fetch5Questions = async (token) => {
  const request = await fetch(`${MULTIPLE_5_QUESTIONS + token}`);
  const response = await request.json();
  return response;
};

export default fetch5Questions;
