import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const ONE_SECOND = 1000;

class Cronometer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.cronometerInterval = setInterval(() => {
      this.setState(({ seconds }) => ({ seconds: seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, { seconds }) {
    this.onUpdate(prevProps, seconds);
  }

  onUpdate(prevProps, seconds) {
    const { optionSelect } = this.props;
    if (seconds === 0) {
      optionSelect();
      this.setState({ seconds: 30 });
      clearInterval(this.cronometerInterval);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <h3>
        { seconds }
      </h3>
    );
  }
}

Cronometer.propTypes = {
  optionSelect: PropTypes.func.isRequired,
};

export default Cronometer;
