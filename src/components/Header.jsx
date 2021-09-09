import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import '../css/Header.css';

class Header extends Component {
  playerScore(name, email, score, assertions) {
    const player = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    const { nome, email, score, assertions } = this.props;
    const md5Email = md5(email).toString();
    const avatar = `https://www.gravatar.com/avatar/${md5Email}`;
    this.playerScore(nome, email, score, assertions);
    return (
      <header className="header-container">
        <div className="header-profile">
          <img data-testid="header-profile-picture" src={ avatar } alt="Avatar" />
          <span data-testid="header-player-name">
            Jogador:
            { nome }
          </span>
        </div>
        <div className="header-score-container">
          <span>Pontos: </span>
          <span className="header-score" data-testid="header-score">
            { score }
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.user.nome,
  email: state.user.email,
  score: state.game.score,
  assertions: state.game.assertions,
});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
