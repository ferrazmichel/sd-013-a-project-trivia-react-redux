import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      correctAnswer: '',
      disabled: false,
      timerValue: 30,
    };
    this.shuffle = this.shuffle.bind(this);
    this.clickedOption = this.clickedOption.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const { hide } = this.props;
    this.shuffle();
    hide();
  }

  shuffle() {
    const { question } = this.props;
    const correctAnswer = question.correct_answer;
    const allAlternatives = [question.correct_answer, ...question.incorrect_answers];
    const magicNumber = 0.5;
    allAlternatives.sort(() => Math.random() - magicNumber);
    this.timer();
    this.setState({
      options: allAlternatives,
      correctAnswer,
      disabled: false,
      timerValue: 30,
    });
  }

  clickedOption({ target: { id } }) {
    const { show } = this.props;
    clearInterval(this.interval);
    if (id === 'correct') {
      const { player } = JSON.parse(localStorage.getItem('state'));
      player.assertions += 1;
      player.score += this.calculateScore(); // calcula e salva no localStorage chave player.score
      localStorage.setItm('state', JSON.stringify({ Player: { ...player } }));
    }
    this.setState({
      disabled: true,
    });
    show();
  }

  calculateScore() {
    const { question: { difficulty } } = this.props;
    const { timerValue } = this.state;
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    let weight = 0;
    const defaultPoints = 10;
    if (difficulty === 'hard') { weight = THREE; }
    if (difficulty === 'medium') { weight = TWO; }
    if (difficulty === 'easy') { weight = ONE; }

    return defaultPoints + (timerValue * weight);
  }

  timer() {
    const { timerValue } = this.state;
    const { show } = this.props;
    const ONE_SECOND = 1000;
    const ZERO = 0;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timerValue: prevState.timerValue - 1,
      }));
      if (timerValue === ZERO) {
        clearInterval(this.interval);
        this.setState({
          disabled: true,
        });
      }
      show();
    }, ONE_SECOND);
  }

  render() {
    const { disabled, options, correctAnswer, timerValue } = this.state;
    const { question } = this.props;

    return (
      <>
        <h2
          data-testid="question-category"
        >
          { question.category }
        </h2>
        <h3
          data-testid="question-text"
        >
          { question.question }
        </h3>
        {options.map((option) => {
          const correct = option === correctAnswer;
          return (
            <Button
              classe="optionButton"
              key={ option }
              dataTestId={
                correct
                  ? 'correct-answer'
                  : `ẁrong-answer-${question.incorrect_answers.indexOf(option)}`
              }
              id={ correct ? 'correct' : 'incorrect' }
              name={ option }
              onClick={ this.clickedOption }
              disabled={ disabled }
            />
          );
        })}
        ;
        <span>{ timerValue }</span>
      </>
    );
  }
}

Question.propTypes = {
  show: PropTypes.func,
  hide: PropTypes.func,
}.isRequired;

export default Question;
