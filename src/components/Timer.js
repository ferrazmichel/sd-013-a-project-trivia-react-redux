import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const INITIAL_TIME = {
  time: 30,
};

// https://www.youtube.com/watch?v=NAx76xx40jM
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
    };
    this.resetTime = this.resetTime.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { time } = this.state;
    const { handleButton, button, handleTimeLeft } = this.props;

    const TIME_IS_OVER = time === 0 && prevState.time === 1;
    const START_NEW_QUESTION = prevProps.button && !button;
    const PLAYER_CLICKED_ON_ANSWER = !prevProps.button && button;

    if (TIME_IS_OVER) {
      handleButton();
      this.stopTimer();
    }

    if (PLAYER_CLICKED_ON_ANSWER) {
      this.stopTimer();
      handleTimeLeft(time);
    }

    if (START_NEW_QUESTION) {
      this.startTimer();
    }
  }

  startTimer() {
    const seg = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, seg);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  resetTime() {
    const { nextQuestion, handleButton } = this.props;

    handleButton();
    this.setState(INITIAL_TIME);
    nextQuestion();
  }

  render() {
    const { time } = this.state;
    const { button } = this.props;
    return (
      <div className="timer">
        { time }
        { button && <Button resetTime={ this.resetTime } /> }
      </div>
    );
  }
}

Timer.propTypes = {
  button: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
  handleTimeLeft: PropTypes.func.isRequired,
};

export default Timer;
