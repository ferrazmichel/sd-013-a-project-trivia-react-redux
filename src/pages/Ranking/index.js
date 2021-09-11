import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.fetchRanking = this.fetchRanking.bind(this);
    this.displayRanking = this.displayRanking.bind(this);
  }

  displayRanking() {
    const sortedRanking = this.fetchRanking();
    return sortedRanking.map((player, index) => (
      <div key={ index }>
        <h3 data-testid={ `player-name-${index}` }>{ player.name }</h3>
        <img src={ player.picture } alt={ player.name } />
        <h4 data-testid={ `player-score-${index}` }>{ player.score }</h4>
      </div>
    ));
  }

  fetchRanking() {
    const currentRanking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = currentRanking.sort((a, b) => b.score - a.score);
    return sortedRanking;
  }

  render() {
    const ranking = this.displayRanking();
    return (
      <>
        <div data-testid="ranking-title">
          <h2>Página de Ranking</h2>
          { ranking }
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
