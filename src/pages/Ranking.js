import React from 'react';
import { Link } from 'react-router-dom';
import './ranking.css';

class Ranking extends React.Component {
  renderRankingList() {
    const rankingStore = localStorage.getItem('ranking');
    const ranking = JSON.parse(rankingStore);
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <ol className="list-group mb-5 ranking-list">
        {
          sortedRanking.map((player, index) => (
            <li
              key={ index }
              className="ranking-item
                list-group-item
                d-flex justify-content-between align-items-center text-white fw-bold
                mb-3"
            >
              <div className="player-image-name">
                <img
                  src={ player.picture }
                  alt={ `${player.name} Avatar` }
                  data-testid="header-profile-picture"
                />
                { ' ' }
                <span data-testid={ `player-name-${index}` }>{ player.name }</span>
              </div>
              <div className="player-score">
                <span>{ ' Pontos: ' }</span>
                <span
                  className="player-score-span"
                  data-testid={ `player-score-${index}` }
                >
                  { player.score }
                </span>
              </div>
            </li>
          ))
        }
      </ol>
    );
  }

  render() {
    return (
      <div
        className="text-center
        d-flex flex-column justify-content-center rounded ranking"
      >
        <h1
          data-testid="ranking-title"
          className="text-uppercase text-white fw-bold mb-5"
        >
          Ranking
        </h1>
        { this.renderRankingList() }
        <Link
          data-testid="btn-go-home"
          to="/"
          className="text-uppercase btn btn-play rounded fw-bold"
        >
          Voltar Início
        </Link>
      </div>
    );
  }
}

export default Ranking;
