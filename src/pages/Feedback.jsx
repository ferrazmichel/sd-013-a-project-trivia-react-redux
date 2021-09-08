import React, { Component } from 'react';

class Feedback extends Component {
  render() {
    const answers = 3;
    const { assertions } = JSON.parse(localStorage.getItem('state'))
      .player;
    return (
      <div data-testid="feedback-text">
        Página de Feedback
        <h1>Feedback</h1>
        <p data-testid="feedback-text">
          {assertions < answers ? (
            <span>Podia ser melhor...</span>
          ) : (
            <span>Mandou bem!</span>
          )}
        </p>

      </div>
    );
  }
}

export default Feedback;
