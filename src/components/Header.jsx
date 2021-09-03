import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { sendPlayerInfo } from '../actions';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hashGerada = md5(gravatarEmail.trim().toLowerCase()).toString();
    const gravatarAvatar = `https://www.gravatar.com/avatar/${hashGerada}`;

    return (
      <header>
        <img data-testid="header-profile-picture" src={ gravatarAvatar } alt="Player" />
        <span data-testid="header-player-name">
          Jogador:
          { name }
        </span>
        <span data-testid="header-score">
          Pontuação:
          { score }
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.shape({
    trim: PropTypes.func,
  }),
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  gravatarEmail: state.user.gravatarEmail,
  name: state.user.name,
  score: state.user.score,
});

const mapDispatchToProps = (dispatch) => ({
  submitPlayer: (payload) => dispatch(sendPlayerInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
