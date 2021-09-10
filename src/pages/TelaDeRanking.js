import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();

    this.rankingToHome = this.rankingToHome.bind(this);
  }

  rankingToHome() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <title data-testid="ranking-title">Ranking dos Jogadores</title>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.rankingToHome }
        >
          Voltar ao Início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Ranking;
