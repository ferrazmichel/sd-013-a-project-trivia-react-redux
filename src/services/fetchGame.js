// a
const fetchQuestions = async (token, configs) => {
  const EXPIRED_CODE = 3; // Se for um token inválido é retornado código 3 na resposta
  const { category, type, difficulty } = configs;
  const END_POINT = `https://opentdb.com/api.php?encode=base64&amount=5&token=${token}&category=${category}&difficulty=${difficulty}&type=${type}&encode=base64`;
  const fetch = await fetch(END_POINT);
  const response = await fetch.json();
  const {  }

  if (response.response_code === EXPIRED_CODE) { // Verifica se o token é válido ou não
    
  };
};

export const mountQuestions = async () => {

};
