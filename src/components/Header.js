import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const hash = md5(email).toString();
    const SRC = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ SRC } alt="imagem do avatar" />
          <h2 data-testid="header-player-name">Nome:</h2>
          <h3 data-testid="header-score">Valor Atual:</h3>
        </header>
      </div>
    );
  }
}

export default Header;
