import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetSeconds, updateSeconds } from '../redux/actions';

const interval = 1000;

class Cronometer extends React.Component {
  constructor() {
    super();
    this.state = {
      setSeconds: null,
    };
  }

  componentDidMount() {
    this.timer();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { setSeconds } = nextState;
    const { seconds } = nextProps;

    if (seconds === 0 && setSeconds) {
      this.clearSeconds(setSeconds);
      return false;
    }

    return true;
  }

  timer() {
    const { updateSec, resetSec } = this.props;

    const ref = setInterval(() => {
      updateSec();
    }, interval);

    this.setState({
      setSeconds: ref,
    });
    resetSec();
  }

  clearSeconds(setSeconds) {
    const { visibility } = this.props;
    document.querySelectorAll('.answer').forEach((answer) => {
      answer.disabled = true;
    });
    clearInterval(setSeconds);
    visibility();

    this.setState({
      setSeconds: null,
    });
  }

  render() {
    const { seconds } = this.props;

    return (
      <h4>
        { seconds }
      </h4>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  seconds: game.seconds,
});

const mapDispatchToProps = (dispatch) => ({
  updateSec: () => dispatch(updateSeconds()),
  resetSec: () => dispatch(resetSeconds()),
});

Cronometer.propTypes = {
  seconds: PropTypes.number.isRequired,
  updateSec: PropTypes.func.isRequired,
  visibility: PropTypes.func.isRequired,
  resetSec: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);
