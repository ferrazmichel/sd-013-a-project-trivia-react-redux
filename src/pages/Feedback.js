import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import PlayAgainButton from '../components/PlayAgainButton';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
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
