import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { timeFinished } from '../redux/actions';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 30,
    };
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    const timeout = 5000;
    const interval = 1000;
    this.timer = setTimeout(() => {
      this.intervalId = setInterval(() => {
        const { countdown } = this.state;
        this.setState({
          countdown: countdown - 1,
        });
      }, interval);
    }, timeout);
  }

  componentDidUpdate() {
    const { countdown } = this.state;
    const { boolClickAnswer, handleColor, createButton } = this.props; // handleTimeout estava sendo desestruturado aqui...
    console.log('Booleano no Countdown DidUpdate', boolClickAnswer);
    if (boolClickAnswer === true) {
      this.stopTimer();
      // clearTimeout(this.timer);
      // clearInterval(this.intervalId);
      // timerFinished(true);
    }
    if (countdown === 0) {
      createButton();
      handleColor();
      this.stopTimer();
    }
  }

  stopTimer() {
    const { timerFinished } = this.props;
    clearTimeout(this.timer); // Para o Set Time out
    clearInterval(this.intervalId); // para o set interval
    timerFinished(true);
  }

  render() {
    const { countdown } = this.state;
    return (
      <span id="timerId">
        { countdown }
      </span>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timerFinished: (booleano) => dispatch(timeFinished(booleano)),
});

Countdown.propTypes = {
  // handleTimeout: propTypes.func.isRequired,
  timerFinished: propTypes.func.isRequired,
  handleColor: propTypes.func.isRequired,
  createButton: propTypes.func.isRequired,
  boolClickAnswer: propTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(Countdown);
