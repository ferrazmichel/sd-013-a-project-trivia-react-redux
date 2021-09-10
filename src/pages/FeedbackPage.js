import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedbackPage extends Component {
  constructor() {
    super();

    this.rankingUpdate = this.rankingUpdate.bind(this);
  }

  componentDidMount() {
    this.rankingUpdate();
  }

  rankingUpdate() {
    const { player: { name, score, email } } = JSON.parse(localStorage.getItem('state'));
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;

    const newRank = {
      name,
      score,
      picture,
    };
    const prevRanking = JSON.parse(localStorage.getItem('ranking'));

    if (prevRanking) {
      localStorage.setItem('ranking', JSON.stringify([...prevRanking, newRank]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newRank]));
    }
  }

  render() {
    const number = 3;

    const localState = JSON.parse(localStorage.getItem('state'));
    const { assertions } = localState.player;

    return (
      <div>
        <Header />
        {(assertions < number) ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">ranking aqui</button>
        </Link>
      </div>
    );
  }
}

export default FeedbackPage;
