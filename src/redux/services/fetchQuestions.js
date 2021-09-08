const getToken = localStorage.getItem('token');
const URL = `https://opentdb.com/api.php?amount=5&token=${getToken}`;

const fetchQuestions = async () => {
  try {
    const response = await fetch(URL);
    const dataToken = await response.json();
    return dataToken;
  } catch (error) {
    console.log(error);
  }
};

export default fetchQuestions;
