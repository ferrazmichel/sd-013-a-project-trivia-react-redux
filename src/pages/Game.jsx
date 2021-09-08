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
    this.handleClickQuestion = this.handleClickQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);

    this.state = {
      questions: [],
      questionNum: 0,
      loading: true,
      timer: 30,
      disabled: false,
      buttonNext: false,
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

  /** Calcula o score do jogador */
  calcScore(timer, difficulty) {
    const number10 = 10;
    const defaultValue = 1;
    const easy = 1;
    const medium = 2;
    const hard = 3;

    switch (difficulty) {
    case 'easy':
      return number10 + (timer * easy);
    case 'medium':
      return number10 + (timer * medium);
    case 'hard':
      return number10 + (timer * hard);
    default:
      return number10 + (timer * defaultValue);
    }
  }

  /** Salvar score do jogador no localStorage */
  handleClickQuestion(event) {
    const { target } = event;
    const { questions, questionNum, timer } = this.state;
    const { difficulty } = questions[questionNum];
    const dataAtribute = target.getAttribute('data-testid');
    const getPlayer = JSON.parse(localStorage.getItem('state'));

    if (dataAtribute === 'correct-answer') {
      getPlayer.player.assertions += 1;
      getPlayer.player.score += this.calcScore(timer, difficulty);
      localStorage.state = JSON.stringify(getPlayer);
      this.setState({ buttonNext: true });
    } else {
      this.setState({ buttonNext: true });
    }
  }

  /** Função do botão próxima pergunta  */
  nextQuestion() {
    this.setState({ buttonNext: false });
    let { questionNum } = this.state;
    const maxQuestions = 4;
    if (questionNum < maxQuestions) {
      this.setState({
        questionNum: questionNum += 1,
      });
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
          onClick={ this.handleClickQuestion }
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
          onClick={ this.handleClickQuestion }
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
          onClick={ this.handleClickQuestion }
          disabled={ disabled }
        >
          { question.correct_answer }
        </button>
      </>
    );
  }

  render() {
    const { loading, score, assertions, buttonNext } = this.state;
    return (
      <div>
        <div>
          <Header score={ score } assertions={ assertions } />
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
        {
          buttonNext && <input
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
            value="Próxima"
          />
        }
      </div>
    );
  }
}

export default Game;
