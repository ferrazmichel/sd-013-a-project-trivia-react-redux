import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { disableButtons } from '../redux/actions';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerEnd: 0,
      timerStart: 30,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const seconds = 1000;
    this.timer = setInterval(this.countDown, seconds);
  }

  countDown() {
    const { timerEnd, timerStart } = this.state;
    const { disable } = this.props;
    if (timerEnd !== timerStart) {
      this.setState({
        timerStart: timerStart - 1,
      });
    } else {
      clearInterval(this.timer);
      disable();
    }
  }

  render() {
    const { timerStart } = this.state;
    return (
      <div>
        {timerStart}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  disable: () => dispatch(disableButtons()),
});

Timer.propTypes = {
  disable: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
