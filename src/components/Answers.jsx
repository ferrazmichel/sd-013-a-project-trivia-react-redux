import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveScoreOnStore from '../redux/actions/saveCurPlayerScore';

import './Button.css';

const answersScore = {
  easy: 1,
  medium: 2,
  hard: 3,
};

class Answers extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      correctColor: 'defaultColor',
      wrongColor: 'defaultColor',
      currentCount: 30,
    };

    this.addScoreOnClick = this.addScoreOnClick.bind(this);
    this.disableButtom = this.disableButtom.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifyClock = this.verifyClock.bind(this);
    this.Timer = this.Timer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.clearIntervalTimer = this.clearIntervalTimer.bind(this);
  }

  componentDidMount() {
    this.Timer();
  }

  setTimer(callback) {
    this.setState((prevState) => ({
      currentCount: prevState.currentCount - 1,
    }), callback);
  }

  clearIntervalTimer() {
    const { currentCount } = this.state;
    if (currentCount < 1) {
      clearInterval(this.gameTimer);
      this.disableButtom();
    }
  }

  stopTimer() {
    return clearInterval(this.gameTimer);
  }

  Timer() {
    const INTERVAL_SECOND = 1000;
    this.gameTimer = setInterval(() => {
      this.setTimer(this.clearIntervalTimer);
    }, INTERVAL_SECOND);
  }

  disableButtom() {
    this.setState({
      disable: true,
      correctColor: 'correctColor',
      wrongColor: 'wrongColor',
    });
  }

  verifyClock() {
    this.disableButtom();
  }

  addScoreOnClick(clock, difficulty) {
    const { easy, medium, hard } = answersScore;
    const difficulties = Object.keys(answersScore).find((key) => key === difficulty);
    let scoreValue;
    switch (difficulties) {
    case 'easy':
      scoreValue = easy;
      break;
    case 'medium':
      scoreValue = medium;
      break;
    case 'hard':
      scoreValue = hard;
      break;
    default:
      break;
    }
    console.log(scoreValue);
    const tenScore = 10;
    const result = tenScore + (clock * scoreValue);
    const { addScoreOnStore } = this.props;
    addScoreOnStore(result);
  }

  handleClick({ target }, correctAnswer, count) {
    const { difficulty } = this.props;
    if (target.value === correctAnswer) {
      this.addScoreOnClick(count, difficulty);
    }
    this.stopTimer();
    this.disableButtom();
  }

  render() {
    const { answers, correctAnswer } = this.props;
    const { correctColor, wrongColor, disable, currentCount } = this.state;
    return (
      <div>
        {answers.map((answer, index) => (
          <button
            type="button"
            disabled={ disable }
            key={ answer }
            value={ answer }
            data-testid={
              correctAnswer === answers[index]
                ? 'correct-answer' : `wrong-answer-${index}`
            }
            onClick={ (e) => this.handleClick(e, correctAnswer, currentCount) }
            className={ correctAnswer === answers[index] ? correctColor : wrongColor }
            difficulty={ answer.difficulty }
          >
            {answer}
          </button>))}
        <p>
          { currentCount }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.ScoreReducer.count,
});

const mapDispatchToProps = (dispatch) => ({
  addScoreOnStore: (payload) => dispatch(saveScoreOnStore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);

const { array, string, number } = PropTypes;

Answers.propTypes = {
  answers: array,
  correctAnswer: array,
  difficulty: string,
  count: number,
}.isRequired;
