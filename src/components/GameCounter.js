import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameCounter extends Component {
  constructor() {
    super();

    this.state = {
      counter: 30,
    };

    this.handleCounterChange = this.handleCounterChange.bind(this);
    this.dispatchIncorrectAnswer = this.dispatchIncorrectAnswer.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
  }

  componentDidMount() {
    this.scoreCalculator();
  }

  scoreCalculator() {
    const { updateScore } = this.props;
    const ten = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const { difficulty } = this.props;
    const { counter } = this.state;
    let diffMultiplier = 0;

    switch (difficulty) {
    case 'hard':
      diffMultiplier = hard;
      break;

    case 'medium':
      diffMultiplier = medium;
      break;

    case 'easy':
      diffMultiplier = easy;
      break;

    default:
      break;
    }

    const score = ten + (counter * diffMultiplier);
    return updateScore(score);
  }

  dispatchIncorrectAnswer(timeout) {
    const { props: { handleTimeout } } = this;

    // adiciona cores a borda das alternativas conforme resposta correta ou errada
    const correctAnswer = document.querySelector('[data-testid="correct-answer"]');
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';
    correctAnswer.disabled = true;

    const wrongAnswers = document.querySelectorAll('[data-testid*="wrong-answer"]');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.style.border = '3px solid rgb(255, 0, 0)';
      wrongAnswer.disabled = true;
    });

    window.clearTimeout(timeout);

    handleTimeout();
  }

  async handleCounterChange() {
    const { counter } = this.state;
    const second = 1000;

    const timeout = setTimeout(() => {
      this.setState({
        counter: counter - 1,
      });
    }, second);

    if (counter === 0) {
      window.clearTimeout(timeout);
      this.dispatchIncorrectAnswer(timeout);
    }
  }

  render() {
    const { counter } = this.state;
    this.handleCounterChange();
    return (
      <p>
        {counter}
      </p>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch({ type: 'UPDATE_SCORE', score }),
  handleTimeout: () => dispatch({ type: 'INCORRECT_ANSWER' }),
});

GameCounter.propTypes = {
  handleTimeout: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(GameCounter);
