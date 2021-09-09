import React from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    const { state: { email, name } } = this.props;

    this.state = {
      player: name,
      gravatarPicture: email,
    };
  }

  render() {
    const { player, gravatarPicture } = this.state;
    const { testid } = this.props;
    const hash = MD5(gravatarPicture).toString();

    const getStorage = JSON.parse(localStorage.getItem('state'));
    const value = getStorage.player.score;

    return (
      <header className="game-header">
        <img
          className="game-gravatar-picture"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}?s=50` }
          alt="Gravatar"
        />

        <span data-testid="header-player-name">
          Jogador:
          {' '}
          { player }
        </span>
        <label htmlFor="value">
          Pontos:
          {' '}
          <span id="value" data-testid={ testid }>
            { value }
          </span>
        </label>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  state: { email: state.login.login,
    name: state.login.name,
  },
});

Header.propTypes = {
  state: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
