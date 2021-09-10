import React from 'react';
import './Header.css';

import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const parseando = JSON.parse(localStorage.getItem('state'));
    const { score, name, emailGravatar } = parseando.player;
    const transformedEmail = md5(emailGravatar).toString();
    const imgAvatar = `https://www.gravatar.com/avatar/${transformedEmail}`;

    return (
      <div className="header">
        <img src={ imgAvatar } alt="" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">
          jogador:
          { name }
        </span>
        <span data-testid="header-score">
          { score }
        </span>
      </div>
    );
  }
}

export default Header;
