import React from 'react';
import RankingCard from '../components/RankingCard';
import { PlayAgainButton } from '../components';

class Ranking extends React.Component {
  render() {
    const magicNumber = -1;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return magicNumber;
      }
      return 0;
    });
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((rank, index) => (<RankingCard
          key={ index }
          index={ index }
          rankInfo={ rank }
        />))}
        <PlayAgainButton testid="btn-go-home" className="button-main" />
      </div>
    );
  }
}

export default Ranking;
