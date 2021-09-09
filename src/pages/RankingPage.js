import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './pagesCSS/rankingpage.css';

class RankingPage extends Component {
  constructor(props) {
    super(props);

    this.updatingRankingList = this.updatingRankingList.bind(this);
    this.rankingList = this.rankingList.bind(this);
  }

  setRankingLocalStorage() {
    let allPlayers = JSON.parse(localStorage.getItem('ranking'));
    if (!allPlayers) {
      allPlayers = [];
      localStorage.setItem('ranking', JSON.stringify(allPlayers));
    }
  }

  updatingRankingList() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state) {
      this.setRankingLocalStorage();
      const { player: { name, gravatarEmail, score } } = state;
      const obj = { name, score, picture: gravatarEmail };
      const allPlayers = JSON.parse(localStorage.getItem('ranking'));
      const updatingPlayers = [...allPlayers, obj]
        .sort(({ score: scoreOne }, { score: scoreTwo }) => {
          const ONE_LESS = -1;
          if (scoreOne < scoreTwo) return 1;
          if (scoreOne > scoreTwo) return ONE_LESS;
          return 0;
        });
      localStorage.setItem('ranking', JSON.stringify(updatingPlayers));
      localStorage.removeItem('state');
    }
  }

  rankingList() {
    const allPlayers = JSON.parse(localStorage.getItem('ranking'));
    return allPlayers.map(({ name, score, picture }, index) => (
      <li key={ index } className="information-players">
        <img src={ picture } alt="Player gravatar img" />
        <h2 data-testid={ `player-name-${index}` }>{ name }</h2>
        <h2 data-testid={ `player-score-${index}` }>{ score }</h2>
      </li>
    ));
  }

  render() {
    this.updatingRankingList();
    const allPlayers = JSON.parse(localStorage.getItem('ranking'));
    const noPlayers = (
      <span className="dont-habe-players">
        No Have Players... Go Play Now!!
      </span>);
    return (
      <div className="main-container-ranking">
        <Link to="/" data-testid="btn-go-home" className="new-start">NEW GAME</Link>
        <ol className="container-ranking-players">
          <h1 data-testid="ranking-title">Ranking</h1>
          { (!allPlayers || !allPlayers.length) ? noPlayers : this.rankingList() }
        </ol>
      </div>
    );
  }
}

export default RankingPage;
