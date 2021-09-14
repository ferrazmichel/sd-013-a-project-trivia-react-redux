import React from 'react';
import { Link } from 'react-router-dom';
import { ListPlayerRanking } from '../components';

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
    const state = localStorage.getItem('state');
    return (
      <>
        <h1 data-testid="ranking-title">RANKING</h1>
        { this.handlePlayAgain() }
        {JSON.parse(state).ranking
          .sort((a, b) => b.score - a.score)
          .map((item, index) => <ListPlayerRanking key={ index } data={ item } />)}
      </>
    );
  }
}

export default Ranking;
