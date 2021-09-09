import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">
          Tela de Ranking
        </h1>
        <Link
          to="/"
          className="ui-button btn-play btn-ranking"
          data-testid="btn-go-home"
        >
          Volte ao Inicío!
        </Link>
      </div>
    );
  }
}

export default Ranking;
