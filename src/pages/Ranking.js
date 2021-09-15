import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Muito bem!!</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
