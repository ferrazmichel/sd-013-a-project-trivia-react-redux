import React from 'react';
import { Link } from 'react-router-dom';
import { Header, PlayAgainButton, Performance, FeedbackMessage } from '../components';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <div className="feedback">
          <Header />
          <FeedbackMessage />
          <Performance />
          <PlayAgainButton
            className="button-main"
            testid="btn-play-again"
          />
          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              type="button"
              className="button-main"
            >
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Feedback;
