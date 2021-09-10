import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCountdown } from '../redux/action';

class Timer extends Component {
  constructor() {
    super();
    this.disableBtns = this.disableBtns.bind(this);
    this.state = {
      counter: 30,
    };
  }

  componentDidMount() {
    const SECOND = 1000;
    this.countdownInterval = setInterval(() => {
      this.setState((prevState) => ({ counter: prevState.counter - 1 }));
    }, SECOND);
  }

  componentDidUpdate() {
    const { counter } = this.state;
    const { timeRemaining, stopCount } = this.props;
    if (counter === 0 || stopCount) {
      clearInterval(this.countdownInterval);
      this.disableBtns();
    }
    timeRemaining({ time: counter });
  }

  disableBtns() {
    const btns = document.querySelectorAll('.alternativas');
    btns.forEach((btn) => {
      btn.disabled = true;
    });
  }

  render() {
    const { counter } = this.state;
    return (
      <div>{ `Tempo restante: ${counter}` }</div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeRemaining: (time) => dispatch(updateCountdown(time)),
});

Timer.propTypes = {
  timeRemaining: PropTypes.func.isRequired,
  stopCount: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
