import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const SECOND_1 = 1000;

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { currentCount: 5 };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), SECOND_1);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer() {
    const { currentCount } = this.state;
    const { shoudStop, verifyClock } = this.props;
    if (currentCount < 1 || shoudStop) {
      clearInterval(this.intervalId);
      verifyClock();
    } else {
      this.setState({
        currentCount: currentCount - 1,
      });
    }
  }

  render() {
    const { currentCount } = this.state;

    return (
      <p>
        {currentCount}
      </p>
    );
  }
}

Clock.propTypes = {
  shoudStop: PropTypes.bool,
  verifyClock: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  clearInterval: (payload) => dispatch(clearInterval(payload)),
});

export default connect(null, mapDispatchToProps)(Clock);
