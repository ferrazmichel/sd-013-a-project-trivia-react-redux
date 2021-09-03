import React from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <img src="" alt="Imagem do usuario" data-testid="header-profile-picture" />
        <h3>
          Nome:
          <span data-testid="header-player-name" />
        </h3>
        <h3>
          Placar:
          <span data-testid="header-score">0</span>
        </h3>
      </header>
    );
  }
}

export default Header;
