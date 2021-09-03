import React, { Component } from 'react';

import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const three = 3; // Se for maior que 3 acertos então passa msg
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-text">
          {assertions < three ? 'Podia ser melhor...' : 'Mandou bem!'}
        </p>

      </div>);
  }
}

export default FeedBack;
