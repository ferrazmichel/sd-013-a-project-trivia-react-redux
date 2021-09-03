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

    return (
      <div>
        {
          questionsArray.map((question, index) => (
            <div key={ index }>
              <p>
                Category:
                <span data-testid="question-category">{question.category}</span>
              </p>
              <p>
                Question:
                <span data-testid="question-text">{question.question}</span>
              </p>
              <ul>
                <li key={ index }>
                  <button type="button" data-testid="correct-answer">
                    {question.correct_answer}
                  </button>
                </li>
                {question.incorrect_answers.map((incorrect, i) => (
                  <li key={ i }>
                    <button type="button" data-testid={ `wrong-answer-${i}` }>
                      {incorrect}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))

        }
      </div>
    );
  }
}

export default Questions;
