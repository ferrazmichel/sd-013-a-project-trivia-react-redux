import React, { Component } from 'react';
import Header from '../components/Header';

class TelaDeFeedback extends Component {
  feedbackMessage() {
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    const IT_COULD_BE_BETTER = 3;
    if (assertions < IT_COULD_BE_BETTER) return 'Podia ser melhor...';
    if (assertions >= IT_COULD_BE_BETTER) return 'Mandou bem!';
  }

  render() {
    const { assertions, score } = JSON.parse(localStorage.getItem('state')).player;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{this.feedbackMessage()}</p>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </p>
        <p>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </p>
      </div>
    );
  }
}

export default TelaDeFeedback;
