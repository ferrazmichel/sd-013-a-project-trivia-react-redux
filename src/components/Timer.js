import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { disableButtons, recordTime, restartTimer } from '../redux/actions';

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
    this.verifyTimer = this.verifyTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    this.verifyTimer();
  }

  startTimer() {
    const seconds = 1000;
    this.timer = setInterval(this.countDown, seconds);
  }

  countDown() {
    const { timerEnd, timerStart } = this.state;
    const { disable, setButtonVisibility } = this.props;
    if (timerEnd !== timerStart) {
      this.setState({
        timerStart: timerStart - 1,
      });
    } else {
      this.setState({
        timerStart: 'Tempo esgotado!',
      });
      clearInterval(this.timer); // para o set interval
      disable(true); // desabilita as alternativas ao fim do tempo
      setButtonVisibility();
    }
  }

  verifyTimer() {
    const { restart, handleRestart, pause, sendTime } = this.props;
    const { timerStart } = this.state;
    if (restart) {
      this.setState({
        timerEnd: 0,
        timerStart: 30,
      });
      clearInterval(this.timer); // para o set interval
      this.startTimer(); // inicia o timer
      handleRestart(false); // set o timer para não reiniciar
    }
    if (pause) {
      clearInterval(this.timer); // para o set interval
      sendTime(timerStart); // manda time em que parou após responder
    }
  }

  render() {
    const { timerStart } = this.state;
    return (
      <div id="timer">
        { timerStart }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  disable: (response) => dispatch(disableButtons(response)),
  handleRestart: (response) => dispatch(restartTimer(response)),
  sendTime: (time) => dispatch(recordTime(time)),
});

const mapStateToProps = ({ questionsReducer }) => ({
  restart: questionsReducer.restartTimer,
  pause: questionsReducer.pauseTimer,
});

Timer.propTypes = {
  disable: PropTypes.func.isRequired,
  handleRestart: PropTypes.func.isRequired,
  sendTime: PropTypes.func.isRequired,
  restart: PropTypes.bool.isRequired,
  pause: PropTypes.bool.isRequired,
  setButtonVisibility: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
