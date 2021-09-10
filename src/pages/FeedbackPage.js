import React, { Component } from 'react';
import Header from '../components/Header';

class FeedbackPage extends Component {
  render() {
    const number = 3;

    const localState = JSON.parse(localStorage.getItem('state'));
    const { assertions } = localState.player;

    return (
      <div>
        <Header />
        {(assertions < number) ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
      </div>
    );
  }
}

export default FeedbackPage;
