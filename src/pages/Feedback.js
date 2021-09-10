import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleFeedback = this.handleFeedback.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handleButtRanking = this.handleButtRanking.bind(this);
  }

  handleFeedback() {
    const state = localStorage.getItem('state');
    const THREE = 3;
    if (JSON.parse(state).player.assertions < THREE) {
      return (
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
      );
    }
    if (JSON.parse(state).player.assertions >= THREE) {
      return (
        <h1 data-testid="feedback-text">Mandou bem!</h1>
      );
    }
  }

  handleRanking() {
    const state = localStorage.getItem('state');
    return (
      <>
        <h1
          data-testid="feedback-total-score"
        >
          {JSON.parse(state).player.score}

        </h1>
        <h1
          data-testid="feedback-total-question"
        >
          {JSON.parse(state).player.assertions}

        </h1>
      </>
    );
  }

  handlePlayAgain() {
    return (
      <Link to="/">
        <button type="button" data-testid="btn-play-again">Jogar Novamente</button>
      </Link>
    );
  }

  handleButtRanking() {
    return (
      <Link to="/ranking">
        <button type="button" data-testid="btn-ranking">Jogar Novamente</button>
      </Link>
    );
  }

  render() {
    return (
      <>
        <Header />
        { this.handleFeedback() }
        { this.handleRanking() }
        { this.handlePlayAgain() }
        { this.handleButtRanking() }
      </>
    );
  }
}

export default Feedback;
