import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
// import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.getImageSource = this.getImageSource.bind(this);
    this.createRanking = this.createRanking.bind(this);
  }

  getImageSource(gravatarEmail) {
    const cryptoEmail = md5(gravatarEmail).toString();
    return `https://www.gravatar.com/avatar/${cryptoEmail}`;
  }

  createRanking() {
    const rankings = JSON.parse(localStorage.getItem('rankings'));
    // const orderedRanking = rankings.sort((a, b) => b.score - a.score);
    // console.log(orderedRanking, 'aqui');
    return rankings.map((player, index) => {
      const { name, gravatarEmail, score } = player;
      // console.log(player);
      return (
        <li key={ index }>
          <img
            data-testid="header-profile-picture"
            src={ this.getImageSource(gravatarEmail) }
            alt={ name }
          />
          <p>
            <span data-testid={ `player-name-${index}` }>{ name }</span>
            <span data-testid={ `player-score-${index}` }>{ score }</span>
          </p>
        </li>
      );
    });
  }

  render() {
    const { createRanking } = this;
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar pro inicio
          </button>
        </Link>
        <ol>
          {createRanking()}
        </ol>
      </div>
    );
  }
}

export default Ranking;
