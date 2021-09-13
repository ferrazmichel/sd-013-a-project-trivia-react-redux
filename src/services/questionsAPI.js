const fetchOnQuestions = async (token, options) => {
  const { category, nQuestions, diff } = options;
  const newCategory = category === 'any' ? 'category=' : `category=${category}`;
  const newDiff = diff === 'any' ? 'difficulty=' : `difficulty=${diff}`;

  const request = await fetch(`https://opentdb.com/api.php?amount=${nQuestions}&${newCategory}&${newDiff}&type=multiple&token=${token}`);
  const response = await request.json();
  return response;
};

export default fetchOnQuestions;
