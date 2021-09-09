import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.handleClickStorage = this.handleClickStorage.bind(this);
  }

  handleClickStorage(nameRaking, scoreRaking, gravatarEmail) {
    const md5Email = md5(gravatarEmail).toString();
    const avatar = `https://www.gravatar.com/avatar/${md5Email}`;
    const ranking = [];
    ranking.push({
      name: nameRaking,
      score: scoreRaking,
      picture: avatar,
    });
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const answers = 3;
    const { assertions, score, name, gravatarEmail } = JSON
      .parse(localStorage.getItem('state'))
      .player;
    return (
      <div data-testid="feedback-text">
        <Header />
        <h1>Feedback</h1>
        <p data-testid="feedback-text">
          {assertions < answers ? (
            <span>Podia ser melhor...</span>
          ) : (
            <span>Mandou bem!</span>
          )}
        </p>
        <div>
          Pontuação total:
          <span data-testid="feedback-total-score">{ score }</span>
        </div>
        <div>
          Total de acertos:
          <span data-testid="feedback-total-question">{ assertions }</span>
        </div>
        <Link
          to="/ranking"
          onClick={ () => this.handleClickStorage(name, score, gravatarEmail) }
          className="ui-button btn-play btn-ranking"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </Link>
        <Link
          to="/"
          className="ui-button btn-play btn-ranking"
          data-testid="btn-play-again"
        >
          Jogar novamente
        </Link>
      </div>
    );
  }
}

export default Feedback;
