import React from 'react';
import PropTypes from 'prop-types';

const AVERAGE = 3;
class FeedbackMSG extends React.Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div className="feedback-messages">

        <h2 data-testid="feedback-text">
          {(assertions >= AVERAGE ? 'Mandou bem! 🤙' : 'Podia ser melhor... 😉')}
        </h2>
        <h3 className="feedback-msg-points">
          Você ganhou
          <h3 data-testid="feedback-total-score">
            {score}
          </h3>
          pontos !!
        </h3>
        <h3 className="feedback-msg-points">
          Você acertou
          <h3 data-testid="feedback-total-question">
            {assertions}
          </h3>
          perguntas !!
        </h3>

      </div>
    );
  }
}

FeedbackMSG.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};
export default FeedbackMSG;
