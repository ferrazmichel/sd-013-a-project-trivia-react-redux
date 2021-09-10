import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearQuestions } from '../actions';

class Ranking extends React.Component {
  componentDidMount() {
    const { clear } = this.props;
    clear();
  }

  render() {
    const rankingArr = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = rankingArr.sort((a, b) => b.score - a.score);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {sortedRanking
          .map(({ name, score, picture }, index) => (
            <div key={ index }>
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
              <img src={ picture } alt={ `ícone de ${name}` } />
            </div>
          ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">ranking aqui</button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  clear: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clear: (bool) => dispatch(clearQuestions(bool)),
});

export default connect(null, mapDispatchToProps)(Ranking);
