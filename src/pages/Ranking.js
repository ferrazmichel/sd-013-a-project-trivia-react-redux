import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Ranking.css';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div className="container-ranking">
        <div>
          <h1 data-testid="ranking-title" className="ranking-header">Ranking</h1>
          <div className="card-ranking">
            <div className="ranking-player">
              { ranking.sort((a, b) => b.score - a.score)
                .map((player, index) => (
                  <div key={ index } className="ranking-players">
                    <img alt={ player.name } src={ player.picture } />
                    <h3
                      className="name-ranking"
                      data-testid={ `player-name-${index}` }
                    >
                      { player.name }
                    </h3>
                    <h3
                      className="score-ranking"
                      data-testid={ `player-score-${index}` }
                    >
                      { player.score }
                    </h3>
                  </div>
                ))}
            </div>
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ () => history.push('/') }
              className="btn-home"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
