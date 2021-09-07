import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, userName } = this.props;
    const hash = md5(email).toString();
    const SRC = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ SRC } alt="imagem do avatar" />
          <h2 data-testid="header-player-name">{ userName }</h2>
          <h3 data-testid="header-score">Pontuação:</h3>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    userName: state.player.name,
    email: state.player.gravatarEmail,
  }
);

export default connect(mapStateToProps)(Header);
