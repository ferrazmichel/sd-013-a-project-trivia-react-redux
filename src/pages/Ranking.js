import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          <div>
            { ranking.sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <div key={ index }>
                  <img alt={ player.name } src={ player.picture } />
                  <h3 data-testid={ `player-name-${index}` }>{ player.name }</h3>
                  <h3 data-testid={ `player-score-${index}` }>{ player.score }</h3>
                </div>
              ))}
          </div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Home
          </button>
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
