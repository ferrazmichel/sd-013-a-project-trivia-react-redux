import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import { getScore } from '../redux/actions/index';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      correctAnswer: '',
    };
    this.shuffle = this.shuffle.bind(this);
    this.clickedOption = this.clickedOption.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    // this.timer = this.timer.bind(this);
    // this.clearInterval = this.clearInterval.bind(this);
  }

  componentDidMount() {
    const { hide, startTimer } = this.props;
    this.shuffle();
    startTimer();
    hide();
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;
    if (prevProps.question.correct_answer !== question.correct_answer) {
      this.shuffle();
    }
  }

  calculateScore() {
    const { question: { difficulty }, timerValue } = this.props;
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

  clickedOption({ target: { id } }) {
    const { show, pauseTimer, isClicked, storeScore } = this.props;
    pauseTimer();
    if (id === 'correct') {
      const { player } = JSON.parse(localStorage.getItem('state'));
      player.assertions += 1;
      player.score += this.calculateScore(); // calcula e salva no localStorage chave player.score
      localStorage.setItem('state', JSON.stringify({ player: { ...player } }));
      storeScore(player.score);
    }
    isClicked();
    show();
  }

  shuffle() {
    const { question } = this.props;
    const correctAnswer = question.correct_answer;
    const allAlternatives = [question.correct_answer, ...question.incorrect_answers];
    const magicNumber = 0.5;
    allAlternatives.sort(() => Math.random() - magicNumber);
    // this.timer();
    this.setState({
      options: allAlternatives,
      correctAnswer,
    });
  }

  render() {
    const { options, correctAnswer } = this.state;
    const { question, timerValue, disabledOptions } = this.props;

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
              disabled={ disabledOptions }
            />
          );
        })}
        <span>{ timerValue }</span>
      </>
    );
  }
}

Question.propTypes = {
  disabledOptions: PropTypes.bool,
  hide: PropTypes.func,
  isClicked: PropTypes.func,
  pauseTimer: PropTypes.func,
  question: PropTypes.object,
  show: PropTypes.func,
  storeScore: PropTypes.func,
  timerValue: PropTypes.number,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  storeScore: (score) => dispatch(getScore(score)),
});

export default connect(null, mapDispatchToProps)(Question);
