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
  }

  dispatchIncorrectAnswer(timeout) {
    const { props: { dispatch } } = this;

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

    dispatch({ type: 'INCORRECT_ANSWER' });
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

GameCounter.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(GameCounter);
