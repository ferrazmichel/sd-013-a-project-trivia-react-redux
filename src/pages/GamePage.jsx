import React from 'react';
import Header from '../components/Header';

class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      numeroDaPergunta: 0,
    };
    this.fetchApi = this.fetchApi.bind(this);
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
  }

  render() {
    this.fetchApi();
    const { results, numeroDaPergunta } = this.state;
    const pergunta = results.filter((result, index) => (index === numeroDaPergunta));
    console.log(pergunta);
    return (
      <div>
        <Header />
        <div>
          { pergunta.map((result, index) => (
            <div key={ index }>
              <div data-testid="question-category">{result.category}</div>
              <div data-testid="question-text">{result.question}</div>
              <div data-testid="correct-answer">{result.correct_answer}</div>
              <div data-testid="wrong-answer-0">{result.incorrect_answers[0]}</div>
              <div data-testid="wrong-answer-1">{result.incorrect_answers[1]}</div>
              <div data-testid="wrong-answer-2">{result.incorrect_answers[2]}</div>
            </div>
          )) }
        </div>
      </div>
    );
  }
}

export default GamePage;
