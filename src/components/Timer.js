import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const TIME = 30;
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
    this.clearTimer = this.clearTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { time } = this.state;
    const { handleButton, button } = this.props;

    if (time === 0 && prevState.time === 1) {
      handleButton();
      this.clearTimer();
    }

    if (time === TIME && prevState.time === 0) {
      // handleButton();
      this.startTimer();
    }

    if (!prevProps.button && button) {
      this.clearTimer();
    }

    if(prevProps.button && !button) {
      this.startTimer();
    }
  }

  startTimer() {
    const seg = 100;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, seg);
  }

  clearTimer() {
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
      <div>
        { time }
        {(button) && <Button resetTime={ this.resetTime } />}
      </div>
    );
  }
}

Timer.propTypes = {
  button: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default Timer;
