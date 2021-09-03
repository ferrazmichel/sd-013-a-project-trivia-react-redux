import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (
      <header>
        { /* <img src={ gravatar } alt="imagemGravatar" data-testid="header-profile-picture" />
        <p>
          User:
          <span data-testid="header-player-name">
            { playerName }
          </span>
        </p>
        <p>
          Score:
          <span data-testid="header-score">
            0
          </span>
    </p> */}
        Tela de jogoo
      </header>
    );
  }
}

export default connect()(Game);
