import React from 'react';
import { Link } from 'react-router-dom';
import RankingList from '../components/RankingList';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <RankingList />
        <Link to="/" data-testid="btn-go-home"> HOME </Link>
      </div>
    );
  }
}

export default Ranking;
