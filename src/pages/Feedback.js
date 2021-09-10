import React from 'react';
import { Link } from 'react-router-dom';
import JogoHeader from '../components/JogoHeader';
import './login.css';

class Feedback extends React.Component {
  render() {
    const storedState = localStorage.getItem('state');
    const state = JSON.parse(storedState);
    const { player: { assertions, score } } = state;
    const MINIMUN_ASSERTIONS = 3;
    return (
      <div d-flex flex-column justify-content-center>
        <JogoHeader score={ score } />
        <div
          className="d-flex flex-column justify-content-center rounded form text-center"
        >
          <h3
            data-testid="feedback-text"
            className="text-uppercase text-white mb-5"
          >
            { (assertions >= MINIMUN_ASSERTIONS) ? 'Mandou bem!' : 'Podia ser melhor...' }
          </h3>
          <p className="text-uppercase text-white">
            Você acertou
            { ' ' }
            <span data-testid="feedback-total-question">{ assertions }</span>
            { assertions === 1 ? ' questão' : ' questões' }
          </p>
          <p className="text-uppercase text-white mb-5">
            Um total de
            { ' ' }
            <span data-testid="feedback-total-score">{ score }</span>
            { ' ' }
            pontos.
          </p>

          <Link
            data-testid="btn-ranking"
            to="/ranking"
            className="text-uppercase btn btn-config fw-bold mb-3"
          >
            Ver Ranking
          </Link>
          <Link
            data-testid="btn-play-again"
            to="/"
            className="text-uppercase btn btn-play rounded fw-bold mb-3"
          >
            Jogar novamente
          </Link>
        </div>
      </div>
    );
  }
}

export default Feedback;
