import React from 'react';
// o componente está sendo renderizado, mas não está passando no teste. Acredito que o teste está sendo executado mais rápido do que o retorno da API e por isso está pegando o estado ainda vazio. Não consegui fazer o setState no componentDidMount, mas acho que se deixá-lo assíncrono e atualizar o estado nele, talvez o teste consiga já pegar o estado atualizado.

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const getToken = JSON.parse(localStorage.getItem('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await fetchQuestions.json();
    const { results } = json;
    this.setState({ questionsArray: results });
  }

  render() {
    const { questionsArray } = this.state;
    if (questionsArray.length === 0) return <p>Loading...</p>;
    return (
      <div>
        <div>
          <p>
            Category:
            <span data-testid="question-category">{questionsArray[0].category}</span>
          </p>
          <p>
            Question:
            <span data-testid="question-text">{questionsArray[0].question}</span>
          </p>
          <ul>
            <li>
              <button type="button" data-testid="correct-answer">
                {questionsArray[0].correct_answer}
              </button>
            </li>
            {questionsArray[0].incorrect_answers.map((incorrect, i) => (
              <li key={ i }>
                <button type="button" data-testid={ `wrong-answer-${i}` }>
                  {incorrect}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Questions;
