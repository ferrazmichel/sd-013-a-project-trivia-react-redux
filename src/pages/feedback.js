import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends React.Component {
  constructor() {
    super();
    this.message = this.message.bind(this);
  }

  message() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { assertions } = state.player;
    const number = 3;
    if (assertions < number) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  render() {
    const getState = JSON.parse(localStorage.getItem('state'));
    const { player } = getState;
    return (
      <div>
        <p data-testid="feedback-text">Página FeedBack</p>
        <Header />
        {this.message()}
        <p data-testid="feedback-total-score">
          { player.score }
          {' '}
          pontos
        </p>
        <p data-testid="feedback-total-question">
          { player.assertions }
          {' '}
          acertos
        </p>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default FeedBack;
