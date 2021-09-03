import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';

import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      point: 0,
      index: 0, // lógica para aparecer cada pergunta
      respondido: false,
    };
    this.checkClick = this.checkClick.bind(this);
    this.passarTime = this.passarTime.bind(this);
    this.randomDif = this.randomDif.bind(this);
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

  passarTime() {
    this.setState((prev) => ({ timer: prev.timer - 1 }));
  }

  checkClass(e) {
    return console.log(e.target.className);
  }

  checkClick(e) {
    let { point } = this.state;
    clearInterval(this.cronometro);
    const compClass = this.checkClass(e);
    if (compClass === 'wrong') {
      point = 0;
    }
    this.setState({ respondido: true });
  }

  randomDif(difficulty) {
    if (difficulty === 'hard') return 3;
    if (difficulty === 'medium') return 2;
    if (difficulty === 'easy') return 1;
  }

  // COM PROBLEMAS
  checkTimer(score) {
    if (timer === 0) {
      return score = 0;
    }
    return score = (point * timer) + base;
  }

  render() {
    const { index, respondido, timer } = this.state;
    const { questions } = this.props;
    const currentQuestion = questions[index];
    const { category, /* type */ difficulty, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = currentQuestion;
    const base = 10;
    let score = 0;
    // const points = this.checkTimer(score);
    const diffValue = this.randomDif(difficulty);
    score = (diffValue * timer) + base;
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
          type="button"
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
};

const mapStateToProps = (state) => ({
  questions: state.fetchQuestions.questions,
});

export default connect(mapStateToProps, null)(Game);
