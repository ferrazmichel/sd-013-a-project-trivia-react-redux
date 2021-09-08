import React from 'react';
import { Link } from 'react-router-dom';
import JogoHeader from '../components/JogoHeader';

class Feedback extends React.Component {
  render() {
    const storedState = localStorage.getItem('state');
    const state = JSON.parse(storedState);
    const { player: { assertions, score } } = state;
    const MINIMUN_ASSERTIONS = 3;
    return (
      <div>
        <JogoHeader score={ score }/>
        <p data-testid="feedback-text">
          { (assertions >= MINIMUN_ASSERTIONS) ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p>
          Você acertou
          { ' ' }
          <span data-testid="feedback-total-question">{ assertions }</span>
          { assertions === 1 ? ' questão' : ' questões' }
        </p>
        <p>
          Um total de
          { ' ' }
          <span data-testid="feedback-total-score">{ score }</span>
          { ' ' }
          pontos.
        </p>

        <Link data-testid="btn-ranking" to="/ranking">Ver Ranking</Link>
        <Link data-testid="btn-play-again" to="/">Jogar novamente</Link>
      </div>
    );
  }
}

export default Feedback;
