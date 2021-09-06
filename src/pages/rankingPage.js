import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RankingPage extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          lista de jogadores
        </ol>
        <Link to="/" data-testid="btn-go-home">New Start</Link>
      </div>
    );
  }
}

export default RankingPage;
