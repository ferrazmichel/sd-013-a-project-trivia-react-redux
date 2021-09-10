import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const localStore = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = localStore.player;
    const THREE = 3;
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-total-score">{ score }</h3>
        <h3 data-testid="feedback-total-question">
          { assertions }
        </h3>
        <h3 data-testid="feedback-text">
          { assertions >= THREE ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h3>
        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
      </div>
    );
  }
}

export default Feedback;
