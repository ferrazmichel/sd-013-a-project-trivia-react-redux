import React from 'react';
import Header from '../components/Header';

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonClass: 'alternativas',
      results: [],
      // shouldFetch: true,
      numeroDaPergunta: 0,
    };
    this.fetchApi = this.fetchApi.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  fetchApi() {
    const url = 'https://opentdb.com/api_token.php?command=request';
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => localStorage.setItem('token', (data.token)));

    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((resp) => resp.json())
      .then((data) => this.setState({ results: data.results }));

    // this.setState({ shouldFetch: false });
  }

  handleClick({ target }) {
    const buttons = document.querySelectorAll('.alternativas');
    buttons.forEach((button) => {
      button.className = 'alternativas selectedErrada';
      if (button.getAttribute('data-testid') === 'correct-answer') {
        button.className = 'alternativas selectedCerta';
      }
    });
    // }
    console.log(target);
  }

  renderButtons() {
    const { results, numeroDaPergunta, buttonClass } = this.state;
    const pergunta = results.filter((result, index) => (index === numeroDaPergunta));

    return (
      <div>
        { pergunta.map((result, index) => (
          <div key={ index }>
            <div data-testid="question-category">{result.category}</div>
            <div data-testid="question-text">{result.question}</div>
            <button
              className={ buttonClass }
              onClick={ this.handleClick }
              type="button"
              data-testid="correct-answer"
            >
              {result.correct_answer}
            </button>
            <button
              className={ buttonClass }
              onClick={ this.handleClick }
              type="button"
              data-testid="wrong-answer-0"
            >
              {result.incorrect_answers[0]}
            </button>
            <button
              className={ buttonClass }
              onClick={ this.handleClick }
              type="button"
              data-testid="wrong-answer-1"
            >
              {result.incorrect_answers[1]}
            </button>
            <button
              className={ buttonClass }
              onClick={ this.handleClick }
              type="button"
              data-testid="wrong-answer-2"
            >
              {result.incorrect_answers[2]}
            </button>
          </div>
        )) }
      </div>
    );
  }

  render() {
    // const { shouldFetch } = this.state;
    // if (shouldFetch) this.fetchApi();
    this.fetchApi();

    return (
      <div>
        <Header />
        { this.renderButtons() }
      </div>
    );
  }
}

export default GamePage;
