import React from 'react';
import PropTypes from 'prop-types';

const THREE = 3;

class FeedbackMessage extends React.Component {
  render() {
    const { player } = this.props;
    const { assertions } = player;

    return (
      <div className="feedback-text-box">
        {
          assertions >= THREE
            ? <p data-testid="feedback-text">Mandou bem</p>
            : <p data-testid="feedback-text">Podia ser melhor...</p>
        }
      </div>
    );
  }
}

FeedbackMessage.propTypes = {
  player: PropTypes.shape({ assertions }).isRequired,
};

export default FeedbackMessage;
