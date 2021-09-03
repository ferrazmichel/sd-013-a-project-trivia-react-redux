import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <img src="" alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name" />
        <p data-testid="header-score" />
      </header>
    );
  }
}

export default Header;
