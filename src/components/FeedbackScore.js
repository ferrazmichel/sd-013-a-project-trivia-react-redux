import React from 'react';
import PropTypes from 'prop-types';

class FeedbackScore extends React.Component {
  render() {
    const { player } = this.props;
    const { assertions, score } = player;

    return (
      <div className="feedback-score-box">
        <p data-testid="feedback-total-score">
          { `Você fez o total de ${score} pontos` }
        </p>
        <p data-tesid="feedback-total-question">
          { `Você acertou ${assertions} questões`}
        </p>
      </div>
    );
  }
}

FeedbackScore.propTypes = {
  player: PropTypes.shape({}).isRequired,
};

export default FeedbackScore;
