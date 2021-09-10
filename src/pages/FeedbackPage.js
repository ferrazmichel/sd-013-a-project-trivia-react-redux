import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedbackPage extends Component {
  render() {
    const number = 3;

    const localState = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = localState.player;

    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        {(assertions < number) ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}

        <Link data-testid="btn-play-again" to="/">Play Again</Link>
        <Link data-testid="btn-ranking" to="/ranking-page">Ranking</Link>
      </div>
    );
  }
}

export default FeedbackPage;
