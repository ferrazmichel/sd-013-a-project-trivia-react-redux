import React from 'react';
import Proptypes from 'prop-types';

const THREE = 3; const TEN = 10;
class FeedbackMSG extends React.Component {
  render() {
    const { score } = this.props;
    const correctAnswers = score / TEN;
    return (
      <div className="feedback-messages">

        <h2 data-testid="feedback-text">
          {(correctAnswers >= THREE ? 'Mandou bem! 🤙' : 'Podia ser melhor... 😉')}
        </h2>
        <h3 data-testid="feedback-total-score">
          {`Você ganhou ${score} 🪙 pontos!`}
        </h3>
        <h3 data-testid="feedback-total-question">
          {`Você acertou ${correctAnswers} ⍰ perguntas! `}
        </h3>

      </div>
    );
  }
}

FeedbackMSG.propTypes = {
  score: Proptypes.number.isRequired,
};
export default FeedbackMSG;
