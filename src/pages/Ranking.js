import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const rankingStore = localStorage.getItem('ranking');
    const ranking = JSON.parse(rankingStore);
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {
            sortedRanking.map((player, index) => (
              <li key={ index }>
                <img
                  src={ player.picture }
                  alt={ `${player.name} Avatar` }
                  data-testid="header-profile-picture"
                />
                { ' ' }
                <span data-testid={ `player-name-${index}` }>{ player.name }</span>
                { ' ' }
                <span data-testid={ `player-score-${index}` }>{ player.score }</span>
              </li>
            ))
          }
        </ol>
        <Link data-testid="btn-go-home" to="/">Voltar Início</Link>
      </div>
    );
  }
}

export default Ranking;
