import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const answers = 3;
    const { assertions } = JSON.parse(localStorage.getItem('state'))
      .player;
    return (
      <div data-testid="feedback-text">
        <Header />
        <h1>Feedback</h1>
        <p data-testid="feedback-text">
          {assertions < answers ? (
            <span>Podia ser melhor...</span>
          ) : (
            <span>Mandou bem!</span>
          )}
        </p>
        <Link
          to="/ranking"
          className="ui-button btn-play btn-ranking"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </Link>
      </div>
    );
  }
}

export default Feedback;
