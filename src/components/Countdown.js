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

  componentDidUpdate(prevProps, prevState) {
    const { countdown } = this.state;
    const { timerFinished } = this.props; // handleTimeout estava sendo desestruturado aqui...
    if (prevState.countdown !== countdown && countdown === 0) {
      clearTimeout(this.timer);
      clearInterval(this.intervalId);
      timerFinished(true);
      // handleTimeout();
    }
  }

  render() {
    const { countdown } = this.state;
    return (
      <span>
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
};

export default connect(null, mapDispatchToProps)(Countdown);
