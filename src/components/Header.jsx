import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import '../css/Header.css';

class Header extends Component {
  playerScore(name, email) {
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    const { nome, email } = this.props;
    const md5Email = md5(email).toString();
    const avatar = `https://www.gravatar.com/avatar/${md5Email}`;
    this.playerScore(nome, email);
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
          <span className="header-score" data-testid="header-score">
            Pontos: 0
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.user.nome,
  email: state.user.email,
});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
