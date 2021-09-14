import React from 'react';
import PropTypes from 'prop-types';

class ListPlayerRanking extends React.Component {
  render() {
    const { data: { name, score, picture } } = this.props;
    return (
      <div>
        <img
          alt="img-profile"
          src={ picture }
        />
        <span data-testid={ `player-name-${name}` }>{name}</span>
        <span data-testid={ `player-score-${score}` }>{score}</span>
      </div>
    );
  }
}

ListPlayerRanking.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    picture: PropTypes.string,
  }),
}.isRequired;

export default ListPlayerRanking;
