import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
//    this.getRanking = this.getRanking.bind(this);
    this.handleRanking = this.handleRanking(this);
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.handleRanking();
  }

//  getRanking() {
 //   const ranking = this.handleRanking();
//    const orderRanking = ({ score: a }, { score: b }) => a > b;
//    const order = ranking.sort(orderRanking);
//    this.setState({ ranking: order });
//  }

  handleRanking() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const picture = `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}`;
    const newObj = {
      name: player.name,
      score: player.score,
      picture,
    };
    const json = localStorage.getItem('ranking');
    const ranking = JSON.parse(json);
    if (!ranking) {
      const newRanking = [newObj];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
      this.setState({ ranking: newRanking });
    } else {
      const newRanking = [...ranking, newObj];
      const ordered = newRanking.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(ordered));
      this.setState({ ranking: ordered });
    }
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { ranking
            .map(({ picture, score, name }, index) => (
              <li key={ index }>
                <img src={ picture } alt="Gravatar" />
                <div data-testid={ `player-name-${index}` }>{ name }</div>
                <div data-testid={ `player-score-${index}` }>{ score }</div>
              </li>
            ))}
        </ul>
        <button type="button" data-testid="btn-go-home">
          <Link to="/">Início</Link>
        </button>
      </div>
    );
  }
}
