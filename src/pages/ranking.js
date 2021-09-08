import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">
          Texto
        </h2>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Início</button>
        </Link>
      </div>

    );
  }
}

export default Ranking;
