import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const ONE_SECOND = 1000;

class Cronometer extends Component {
  constructor() {
    super();
    this.state = {
      time: 5,
    };
  }

  componentDidMount() {
    this.cronometerInterval = setInterval(() => {
      this.setState(({ time }) => ({ time: time - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, { time }) {
    this.onUpdate(prevProps, time);
  }

  componentWillUnmount() {
    const { time } = this.state;
    const { changeSeconds } = this.props;
    changeSeconds(time);
    clearInterval(this.cronometerInterval);
  }

  onUpdate(prevProps, time) {
    const { optionSelect } = this.props;
    if (time === 0) {
      optionSelect();
      this.setState({ time: 5 });
      clearInterval(this.cronometerInterval);
    }
  }

  render() {
    const { time } = this.state;
    return (
      <h3>
        { time }
      </h3>
    );
  }
}

Cronometer.propTypes = {
  optionSelect: PropTypes.func.isRequired,
};

export default Cronometer;
