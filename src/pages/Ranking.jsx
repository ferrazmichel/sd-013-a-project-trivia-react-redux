import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      score: [],
    };

    this.createRanking = this.createRanking.bind(this);
  }

  componentDidMount() {
    this.createRanking();
  }

  createRanking() {
    const { name, score, gravatarEmail, assertions } = JSON
      .parse(localStorage.getItem('state')).player;
    const newPlayer = { name, score, gravatarEmail, assertions };
    if (localStorage.ranking) {
      const ranking = JSON.parse(localStorage.ranking);
      const rankingUppdate = [...ranking, newPlayer];
      localStorage.ranking = JSON.stringify(rankingUppdate);
      rankingUppdate.sort((a, b) => b.score - a.score);
      this.setState({ score: rankingUppdate });
    } else {
      const ranking = [newPlayer];
      localStorage.ranking = JSON.stringify(ranking);
      this.setState({ score: ranking });
    }
  }

  render() {
    const { score } = this.state;

    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>

        {
          score.map((jogador, index) => (
            <section key={ jogador.name }>
              <img src={ `https://www.gravatar.com/avatar/${md5(jogador.gravatarEmail).toString()}` } alt={ jogador.name } />
              <span data-testid={ `player-name-${index}` }>{`${jogador.name}`}</span>
              <span data-testid={ `player-score-${index}` }>{jogador.score}</span>
            </section>))
        }
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Início
          </button>
        </Link>
      </div>
    );
  }
}
export default Ranking;
