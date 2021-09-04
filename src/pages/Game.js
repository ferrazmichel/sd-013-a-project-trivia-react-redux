import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';

import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      assertions: 0, // numero de acertos
      score: 0, // total da questão
      total: 0, // total acumulado
      timer: 30,
      index: 0, // lógica para aparecer cada pergunta
      respondido: false,
      validate: false, // lógica para verificar se a resposta é a correta
    };
    this.checkClick = this.checkClick.bind(this);
    this.passarTime = this.passarTime.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  componentDidMount() {
    const number = 1000;
    this.cronometro = setInterval(this.passarTime, number);
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.cronometro);
    }
  }

  setLocalStorage() {
    const { state: { total, assertions }, props: { user, email } } = this;
    const test = {
      player: {
        name: user,
        assertions,
        score: total,
        gravatarEmail: email,
      } };
    localStorage.setItem('state', JSON.stringify(test));
  }

  passarTime() {
    this.setState((prev) => ({ timer: prev.timer - 1 }));
  }

  checkClick(e) {
    clearInterval(this.cronometro);
    this.setState({ respondido: true });
    this.calculateScore(e); // verifica se a resposta é a correta
  }

  handleDifficulty(difficulty) {
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
      return null;
    }
  }

  handleScore(difficulty) { // calcula a quantidade de pontos de acordo com a dificuldade
    const { timer } = this.state;
    const number = 10;
    let score = (difficulty * timer) + number;
    if (timer === 0) {
      score = 0;
    }
    return score;
  }

  calculateScore(e) {
    const { state: { index, timer }, props: { questions } } = this;

    const elementId = e.target.id;

    const { difficulty } = questions[index]; // primeira questão,
    const questionLevel = this.handleDifficulty(difficulty);

    const points = timer !== 0 ? this.handleScore(questionLevel) : 0; // ternnário que calcula o total de pontos da questão

    if (elementId === 'correct') { // verifica se é a resposta correta e atualiza o estado
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
        score: points,
        validate: !prevState.validate,
        total: prevState.total + points }));
      this.setLocalStorage();
    }
  }

  render() {
    const { state: { index, score, respondido, timer, validate },
      props: { questions } } = this;
    const currentQuestion = questions[index];
    const { category,
      /* type */ question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = currentQuestion;
    return (
      <main>
        <Header score={ score } respondido={ respondido } validate={ validate } />
        <h2>{timer}</h2>
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
          disabled={ respondido || timer === 0 }
          type="button"
          data-testid="correct-answer"
          id="correct" // id criado para fazer a validação da resposta, não consegui usar o className pois ele só aparece quando o botão é clicado..
          className={ respondido ? 'correct' : '' }
          onClick={ (e) => this.checkClick(e) }
        >
          {correctAnswer}
        </button>
        {incorrectAnswers.map((answer, i) => (
          <button
            disabled={ respondido || timer === 0 }
            type="button"
            key={ i }
            onClick={ (e) => this.checkClick(e) }
            className={ respondido ? 'wrong' : '' }
            data-testid={ `wrong-answer-${i}` }
          >
            {answer}
          </button>
        ))}
      </main>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf({}).isRequired,
  user: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,

};

const mapStateToProps = (state) => ({
  questions: state.fetchQuestions.questions,
  user: state.login.login,
  email: state.login.email,
});

export default connect(mapStateToProps, null)(Game);
