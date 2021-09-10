import React from 'react';
import PropTypes from 'prop-types';

class RankingCard extends React.Component {
  render() {
    const { index, rankInfo: { name, score, picture } } = this.props;
    return (
      <div>
        <img src={ picture } alt="" />
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </div>
    );
  }
}

RankingCard.propTypes = {
  index: PropTypes.number.isRequired,
  rankInfo: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    picture: PropTypes.string,
  }).isRequired,
};

export default RankingCard;
