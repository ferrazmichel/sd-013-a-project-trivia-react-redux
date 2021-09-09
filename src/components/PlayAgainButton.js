import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PlayAgainButton extends Component {
  render() {
    const { testid } = this.props;
    return (
      <Link to="/">
        <button data-testid={ testid } type="button">
          Jogar novamente
        </button>
      </Link>
    );
  }
}

PlayAgainButton.propTypes = {
  testid: PropTypes.string.isRequired,
};
