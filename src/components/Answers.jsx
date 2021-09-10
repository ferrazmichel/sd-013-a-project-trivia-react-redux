import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveScoreOnStore from '../redux/actions/saveCurPlayerScore';
import { savePlayerDataOnLocalStorage } from '../pages/pageFunctions/loginFuncs';

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
      score: 0,
      assertions: 0,
      disable: false,
      correctColor: 'defaultColor',
      wrongColor: 'defaultColor',
      currentCount: 30,
      hide: false,
    };

    this.addScoreOnClick = this.addScoreOnClick.bind(this);
    this.disableButtom = this.disableButtom.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifyClock = this.verifyClock.bind(this);
    this.Timer = this.Timer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.clearIntervalTimer = this.clearIntervalTimer.bind(this);
    this.nextQuestionOnClick = this.nextQuestionOnClick.bind(this);
    this.showNextButton = this.showNextButton.bind(this);
    this.resetTimeNext = this.resetTimeNext.bind(this);
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

  nextQuestionOnClick() {
    const { nextQuestion } = this.props;
    nextQuestion();
    this.setState({
      disable: false,
      correctColor: 'defaultColor',
      wrongColor: 'defaultColor',
      hide: false,
    });
    this.resetTimeNext();
  }

  resetTimeNext() {
    this.setState({
      currentCount: 30,
    });
    this.Timer();
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
    const { score } = this.state;
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
    const tenScore = 10;
    const result = score + (tenScore + (clock * scoreValue));
    const getPlayer = JSON.parse(localStorage.getItem('state')).player;
    console.log(getPlayer);
    this.setState((prevState) => (
      {
        score: result,
        assertions: prevState.assertions + 1,
      }
    ), () => {
      const { assertions } = this.state;
      const newPlayer = {
        ...getPlayer,
        score: result,
        assertions,
      };
      savePlayerDataOnLocalStorage(newPlayer);
    });
    const { addScoreOnStore } = this.props;
    addScoreOnStore(result);
  }

  showNextButton() {
    this.setState({
      hide: true,
    });
  }

  handleClick({ target }, correctAnswer, count) {
    const { difficulty } = this.props;
    if (target.value === correctAnswer) {
      this.addScoreOnClick(count, difficulty);
    }
    this.stopTimer();
    this.disableButtom();
    this.showNextButton();
  }

  renderButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => this.nextQuestionOnClick() }
      >
        Próxima
      </button>
    );
  }

  render() {
    const { answers, correctAnswer } = this.props;
    const { correctColor, wrongColor, disable, currentCount, hide } = this.state;
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
        { hide ? this.renderButton() : null }
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
