// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Helpers
import gravatar from '../helpers/gravatarAPI';

class HeaderGame extends Component {
  constructor(props) {
    // Super marked as "deprecated"
    super(props);
    this.playerLocalStorage = this.playerLocalStorage.bind(this);
  }

  componentDidMount() {
    this.playerLocalStorage();
  }

  playerLocalStorage() {
    const { props: { playerEmail, playerName } } = this;
    /*
      state: {
          player: {
          name,
          assertions,
          score,
          gravatarEmail
        },
      }
    */
    const player = {
      player: {
        name: playerName,
        assertions: 0,
        score: 0,
        gravatarEmail: gravatar(playerEmail),
      },
    };

    window.localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    const { props: { playerEmail, playerName } } = this;
    const gravatarSrc = gravatar(playerEmail);
    return (
      <header>
        {/* Gravatar */}
        <img
          src={ gravatarSrc }
          id="header-profile-picture"
          data-testid="header-profile-picture"
          alt="gravatar"
        />
        {/* Nome do jogador */}
        <span
          id="header-profile-picture"
          data-testid="header-player-name"
        >
          { playerName }
        </span>
        {/* Pontuação */}
        <span
          id="header-score"
          data-testid="header-score"
        >
          0
        </span>
      </header>
    );
  }
}

HeaderGame.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  playerName: store.login.nome,
  playerEmail: store.login.email,
});

export default connect(mapStateToProps, null)(HeaderGame);
