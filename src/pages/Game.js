import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';

import Header from '../components/Header';
import NextButton from '../components/nextButton';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
      index: 0, // lógica para aparecer cada pergunta
      score: 0,
      // point: 0,
      respondido: false,
      timer: 30,
      total: 0,
    };
    this.checkClick = this.checkClick.bind(this);
    this.passarTime = this.passarTime.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.nextQuestionBtn = this.nextQuestionBtn.bind(this);
  }

  componentDidMount() {
    const number = 1000;
    this.cronometro = setInterval(this.passarTime, number);
  }

  componentDidUpdate() {
    const { state: { timer, respondido } } = this;
    if (timer === 0 || respondido) {
      clearInterval(this.cronometro);
    }
  }

  setLocalStorage() {
    const { props: { user, emailUser },
      state: { assertions, score } } = this;

    const obj = {
      player: {
        name: user,
        assertions,
        score,
        gravatarEmail: emailUser,
      },
    };
    localStorage.setItem('state', JSON.stringify(obj));
  }

  passarTime() {
    this.setState((prev) => ({ timer: prev.timer - 1 }));
  }

  async checkAnswer(e) {
    this.setState({ respondido: true });

    const { timer } = this.state;
    let points = 0;
    const elementId = e.target.id;

    if (elementId === 'correct') {
      points = timer === 0 ? 0 : this.calculateScore();
      await this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
        score: points,
        total: prevState.total + points,
      }));
    }
  }

  async checkClick(e) { // a função precisa ser assincrona para a linha 78 ocorrer antes da 79 (setState é assincrono)
    clearInterval(this.cronometro);
    await this.checkAnswer(e);
    this.setLocalStorage();
  }

  handleDificulty() {
    const { state: { index }, props: { questions } } = this;
    const question = questions[index];
    const { difficulty } = question;

    const hard = 3;
    const medium = 2;
    const easy = 1;

    switch (difficulty) {
    case 'hard':
      return hard;
    case 'medium':
      return medium;
    case 'easy':
      return easy;
    default:
      return 0;
    }
  }

  calculateScore() {
    const { timer } = this.state;
    const number = 10;
    let score = 0;
    const dif = this.handleDificulty();
    score = (timer * dif) + number;
    return score;
  }

  nextQuestionBtn() {
    const number = 1000;
    this.cronometro = setInterval(this.passarTime, number);
    this.setState((prev) => ({
      index: prev.index + 1,
      timer: 30,
      respondido: false,
      score: 0,
    }));
  }

  render() {
    const { state: { index, respondido, timer, score }, props: { questions } } = this;
    const currentQuestion = questions[index];

    const { category, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = currentQuestion;

    return (
      <main>
        <Header score={ score } respondido={ respondido } />
        <h2>{ timer }</h2>
        <h2
          data-testid="question-category"
        >
          {category}
        </h2>
        <h3
          type="button"
          data-testid="question-text"
        >
          {question}
        </h3>
        <button
          id="correct"
          type="button"
          disabled={ timer === 0 || respondido }
          data-testid="correct-answer"
          className={ respondido ? 'correct' : '' }
          onClick={ this.checkClick }
        >
          {correctAnswer}
        </button>
        {incorrectAnswers.map((answer, i) => (
          <button
            type="button"
            key={ i }
            onClick={ (e) => this.checkClick(e) }
            className={ respondido ? 'wrong' : '' }
            disabled={ timer === 0 || respondido }
            data-testid={ `wrong-answer-${i}` }
          >
            {answer}
          </button>
        ))}
        {respondido ? <NextButton nextQuestionBtn={ this.nextQuestionBtn } /> : null}
      </main>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf({}).isRequired,
  user: PropTypes.string.isRequired,
  emailUser: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.fetchQuestions.questions,
  emailUser: state.login.email,
  user: state.login.login,
});

export default connect(mapStateToProps, null)(Game);
