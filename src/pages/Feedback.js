import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  feedbackMessage(assertions) {
    const MINIMUM = 3;
    if (assertions < MINIMUM) return 'Podia ser melhor...';
    return 'Mandou bem!';
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions } = player;
    const message = this.feedbackMessage(assertions);
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">{message}</h2>
      </div>
    );
  }
}

export default Feedback;
