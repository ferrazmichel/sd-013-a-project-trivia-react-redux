import React from 'react';
import { Link } from 'react-router-dom';
import { Header, PlayAgainButton, Performance, FeedbackMessage } from '../components';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <FeedbackMessage />
        <Performance />
        <PlayAgainButton testid="btn-play-again" />
        <Link to="/ranking">
          <button data-testid="btn-ranking" type="button">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
