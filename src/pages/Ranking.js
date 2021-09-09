import React from 'react';
import PlayAgainButton from '../components/PlayAgainButton';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <PlayAgainButton testid="btn-go-home" />
      </div>
    );
  }
}

export default Ranking;
