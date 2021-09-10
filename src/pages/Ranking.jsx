import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();

    this.saveRankingStorage = this.saveRankingStorage.bind(this);
    this.getRankingStorage = this.getRankingStorage.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    // salvando ranking no estado
    this.state = {
      rankings: [],
    };
  }

  componentDidMount() {
    this.saveRankingStorage();
  }

  // funçao para salvar a figura da url
  getGravatarPicture(email) {
    const hash = md5(email).toString();
    const gravatarPicture = `https://www.gravatar.com/avatar/${hash}`;
    return gravatarPicture;
  }

  // pegando o ranking no storage
  getRankingStorage(localStorageRanking) {
    if (localStorageRanking) {
      this.setState({
        rankings: localStorageRanking,
      });
    } else {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      this.setState({
        rankings: ranking,
      });
    }
  }

  // funçao para salvar o ranking no localStorage
  saveRankingStorage() {
    const { name, gravatarEmail, score } = JSON
      .parse(localStorage.getItem('state')).player;
    const picture = this.getGravatarPicture(gravatarEmail);
    const localStorageRanking = JSON.parse(localStorage.getItem('ranking'));

    if (!localStorageRanking) {
      const ranking = [{ name, score, picture }];
      localStorage.setItem('ranking', JSON.stringify(ranking));
      this.getRankingStorage();
    } else {
      const ranking = { name, score, picture };

      localStorageRanking.push(ranking);
      localStorage.setItem('ranking', JSON.stringify(localStorageRanking));

      this.getRankingStorage(localStorageRanking);
    }
  }

  handleClickLogin() {
    const { history } = this.props;

    history.push('/');
  }

  render() {
    const { rankings } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {/* usa o sort para colocar em ordem decrescente */}
          {rankings.sort((a, b) => b.score - a.score)
            .map(({ name, picture, score }, index) => (
              <li key={ index }>
                <img src={ picture } alt="Player Gravatar" />
                <span data-testid={ `player-name-${index}` }>
                  { name }
                </span>
                <span data-testid={ `player-score-${index}` }>
                  { score }
                </span>
              </li>
            ))}
        </ul>
        <button
          type="button"
          className="ui-button btn-play btn-ranking"
          data-testid="btn-go-home"
          onClick={ this.handleClickLogin }
        >
          Voltar ao início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
