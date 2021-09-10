import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <>
        <div data-testid="ranking-title">
          Página de Ranking
        </div>
        <Link to="/">
          <button
            className="btn btn-info"
            type="button"
            data-testid="btn-go-home"
          >
            Jogar novamente
          </button>
        </Link>
      </>
    );
  }
}

export default Ranking;
