import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.fetchTriviaApi = this.fetchTriviaApi.bind(this);
    this.storeTokenOnLocalStorage = this.storeTokenOnLocalStorage.bind(this);
    this.responseTime = this.responseTime.bind(this);

    this.state = {
      questions: [],
      questionNum: 0,
      loading: true,
      timer: 30,
      disabled: false,
    };
  }

  componentDidMount() {
    this.fetchTriviaApi();
    this.responseTime();
  }

  getTokenOnLocalStorage() {
    const tokenStr = localStorage.getItem('token');
    const tokenObj = JSON.parse(tokenStr);

    this.fetchQuestions(tokenObj.token);
  }

  storeTokenOnLocalStorage(tokenObj) {
    localStorage.setItem('token', JSON.stringify(tokenObj));
    this.getTokenOnLocalStorage();
  }

  async fetchTriviaApi() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    console.log(token);

    this.storeTokenOnLocalStorage(token);
  }

  async fetchQuestions(token) {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();

    console.log(questions.results);

    this.setState({
      questions: questions.results,
      loading: false,
    });
  }

  responseTime() {
    const second = 1000;
    const { timer } = this.state;
    if (timer > 0) {
      this.setState({ timer: timer - 1 }); // consulta ao site - "https://stackoverflow.com/questions/40885923/countdown-timer-in-react"
      setTimeout(this.responseTime, second); // setInterval nao da, pulas os segundos rapidamente
    }
    if (timer === 0) {
      this.setState({ disabled: true });
    }
  }

  renderQuestions() {
    const { questions, questionNum, timer } = this.state;

    return (
      <>
        <span>{ `Tempo: ${timer}` }</span>
        <h1 data-testid="question-text">
          { questions[questionNum].question }
        </h1>
        <h2 data-testid="question-category">
          { questions[questionNum].category }
        </h2>
        {this.renderAnswers(questions[questionNum])}
      </>
    );
  }

  renderAnswers(question) {
    const { disabled } = this.state;
    let incorrectAnswers;
    if (question.type === 'multiple') {
      incorrectAnswers = question.incorrect_answers.map((answer, index) => (
        <button
          data-testid={ `wrong-answer-${index}` }
          type="button"
          key={ index }
          disabled={ disabled }
        >
          { answer }
        </button>
      ));
    } else {
      incorrectAnswers = (
        <button
          data-testid="wrong-answer-0"
          type="button"
          disabled={ disabled }
        >
          { question.incorrect_answers[0] }
        </button>
      );
    }
    return (
      <>
        {incorrectAnswers}
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ disabled }
        >
          { question.correct_answer }
        </button>
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Header />
        {
          loading ? <div>Carregando</div> : this.renderQuestions()
        }
        {/* <div> // caso precise mais para frente, pois está dinamico.
          <h2>Categoria da pergunta</h2>
          <div>
            Alternativas
          </div>
        </div> */}
      </div>
    );
  }
}

export default Game;
