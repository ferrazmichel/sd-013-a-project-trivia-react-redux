import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  componentDidUpdate(qlqr, prevState) {
    const { time } = this.state;
    const { onChange } = this.props;
    console.log(prevState.time);

    if (time === 0 && prevState.time === 1) {
      onChange();
      this.clearTimer();
    }

    if (time === TIME && prevState.time === 0) {
      onChange();
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

  clearTimer() {
    clearInterval(this.interval);
  }

  resetTime() {
    const { nextQuestion } = this.props;

    this.setState(INITIAL_TIME);
    nextQuestion();
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        { time }
        {time === 0 && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.resetTime }
          >
            Próxima
          </button>)}
      </div>
    );
  }
}

Timer.propTypes = {
  onChange: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default Timer;
