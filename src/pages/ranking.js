import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Ranking extends React.Component {
  constructor() {
    super();
    this.home = this.home.bind(this);
  }

  home() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title" className="ranking-title">TELA DE RANKING</h1>
        {ranking.map((element, index) => (
          <div key={ index } className="ranking-item">
            <img src={ element.picture } alt={ element.name } className="ranking-img" />
            <p data-testid={ `player-name${index} ` }>{element.name}</p>
            <p data-testid={ `player-score-${index}` }>
              {element.score}
              pts
            </p>
          </div>))}
        <button
          className="play-again-button"
          type="button"
          data-testid="btn-go-home"
          onClick={ this.home }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
