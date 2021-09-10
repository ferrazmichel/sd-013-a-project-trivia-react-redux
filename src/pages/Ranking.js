import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlayAgain = this.handlePlayAgain.bind(this);
  }

  handlePlayAgain() {
    return (
      <Link to="/">
        <button type="button" data-testid="btn-go-home">Jogar Novamente</button>
      </Link>
    );
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">RANKING</h1>
        { this.handlePlayAgain() }
      </>
    );
  }
}

export default Ranking;
