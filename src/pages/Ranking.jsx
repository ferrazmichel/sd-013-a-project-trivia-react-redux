import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <p data-testid="ranking-title" />
        <Link to="feedback">
          <button type="button">Voltar</button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Go Home</button>
        </Link>
      </>
    );
  }
}

export default Ranking;
