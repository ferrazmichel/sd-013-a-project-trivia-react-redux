import React from 'react';
import { Link } from 'react-router-dom';
import './Ranking.css';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <p data-testid="ranking-title" />
        <Link to="feedback">
          <button className="btn-ranking" type="button">Voltar</button>
        </Link>
        <Link to="/">
          <button
            className="btn-ranking"
            type="button"
            data-testid="btn-go-home"
          >
            Go Home
          </button>
        </Link>
      </>
    );
  }
}

export default Ranking;
