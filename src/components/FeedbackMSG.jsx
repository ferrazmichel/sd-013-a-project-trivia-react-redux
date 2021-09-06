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
        <h3 data-testid="feedback-total-score">
          {`Você ganhou ${score} 🪙 pontos!`}
        </h3>
        <h3 data-testid="feedback-total-question">
          {`Você acertou ${assertions} ⍰ perguntas! `}
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
