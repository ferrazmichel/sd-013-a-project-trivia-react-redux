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
      // point: 0,
      index: 0, // lógica para aparecer cada pergunta
      respondido: false,
    };
    this.checkClick = this.checkClick.bind(this);
    this.passarTime = this.passarTime.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
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

  // foi comentado as linhas pra poder fazer o merge do req. 8;
  checkClick(e) {
    // let { point } = this.state;
    clearInterval(this.cronometro);
    this.checkClass(e);
    // const compClass = this.checkClass(e);
    // if (compClass === 'wrong') {
    //   point = 0;
    // }
    this.setState({ respondido: true });
  }

  calculateScore(difficulty) {
    const { timer } = this.state;
    const score = 10;
    const hardMultiplyier = 3;
    const mediumMultiplyier = 2;
    console.log(difficulty);
    switch (difficulty) {
    case 'hard':
      return (score + (timer * hardMultiplyier));
    case 'medium':
      return (score + (timer * mediumMultiplyier));
    case 'easy':
      return (score + timer);
    default:
      return 0;
    }
  }

  render() {
    const { index, respondido, timer } = this.state;
    const { questions } = this.props;
    const currentQuestion = questions[index];
    const { category, /* type */ difficulty, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = currentQuestion;
    let score = 0;
    score = this.calculateScore(difficulty);
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
          disabled={ timer === 0 }
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
            disabled={ timer === 0 }
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
